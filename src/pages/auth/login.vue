<script setup lang="ts">
import type { ILoginRequest } from '@/models/interfaces/auth.interface';

import IconEye from '@/assets/icons/modules/auth/IconEye.svg';
import IconEyeClosed from '@/assets/icons/modules/auth/IconEyeClosed.svg';
import IconRequired from '@/assets/icons/shared/IconRequired.svg';
import useAuthStore from '@/stores/auth.store';
import { toTypedSchema } from '@vee-validate/yup';
import { useForm } from 'vee-validate';
import { object as yupObject, string as yupString } from 'yup';

import { login } from '~/apis/auth.api';
import { AUTH, HOME } from '~/constants/route-pages.const';
import { REGEXES, SELECTORS } from '~/constants/shared.const';

definePageMeta({
  layout: 'guest',
  middleware: 'auth-middleware',
  requiresAuth: false,
  roles: [],
  title: 'Authentication',
});

const schema = yupObject({
  email: yupString()
    .required('Email is required')
    .email('Invalid email format')
    .matches(REGEXES.EMAIL, 'Invalid email format'),
  password: yupString()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});
const { handleSubmit } = useForm<ILoginRequest>({
  initialValues: {
    email: '',
    password: '',
  },
  validationSchema: toTypedSchema(schema),
});
const { t } = useI18n();
const authStore = useAuthStore();
const router = useRouter();
const { handleCatchError } = useHandleCatchError();

const isShowPassword = ref<boolean>(false);

const toggleIsShowPassword = () => {
  isShowPassword.value = !isShowPassword.value;
};

const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await login(values);
    authStore.setToken(response.data.accessToken);
    await router.push(HOME);
  } catch (error) {
    handleCatchError(error);
  }
});
</script>

<template>
  <div class="container">
    <section :id="SELECTORS.LOGIN_SECTION">
      <h4>{{ t('auth.login') }}</h4>

      <ElForm
        labelWidth="auto"
        labelPosition="top"
        hideRequiredAsterisk
        style="width: 100%"
        @submit="onSubmit"
      >
        <BaseFormItem name="email">
          <template #label>
            <span>{{ t('auth.email') }}</span>
            <IconRequired />
          </template>

          <template #default="{ modelValue, updateModelValue }">
            <BaseInput
              placeholder="name@email.com"
              :modelValue="modelValue"
              @input="updateModelValue"
            />
          </template>
        </BaseFormItem>

        <BaseFormItem name="password">
          <template #label>
            <span>{{ t('auth.password') }}</span>
            <IconRequired />
          </template>

          <template #default="{ modelValue, updateModelValue }">
            <BaseInput
              :placeholder="t('auth.inputPassword')"
              :modelValue="modelValue"
              :type="isShowPassword ? 'text' : 'password'"
              @input="updateModelValue"
            >
              <template #suffix>
                <component
                  :is="isShowPassword ? IconEye : IconEyeClosed"
                  @click="toggleIsShowPassword"
                />
              </template>
            </BaseInput>
          </template>
        </BaseFormItem>

        <BaseButton
          type="primary"
          nativeType="submit"
          class="tw-w-full tw-mt-2"
        >
          {{ t('auth.login') }}
        </BaseButton>
      </ElForm>

      <div class="container__register-now">
        <p>{{ t('auth.noAccount') }}</p>
        <RouterLink :to="AUTH.REGISTER">{{ t('auth.registerNow') }}</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/components/auth/login.scss';
</style>
