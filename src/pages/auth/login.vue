<script setup lang="ts">
import type { ILoginRequest } from '@/models/interfaces/auth.interface';

import useAuthStore from '@/stores/auth.store';
import { toTypedSchema } from '@vee-validate/yup';
import { useForm } from 'vee-validate';
import { object as yupObject, string as yupString } from 'yup';

const { MODULES, SHARED } = constants.iconPaths;
const { LOGIN_BUTTON } = constants.shared.SELECTORS;
const { AUTH, HOME } = constants.routePages;

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
    .matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email format'),
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

const showPassword = ref<boolean>(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await apis.auth.login(values);
    authStore.setToken(response.data.accessToken);
    await router.push(HOME);
  } catch (error) {
    handleCatchError(error);
  }
});
</script>

<template>
  <div class="login">
    <section>
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
            <BaseIconSvg width="5" height="10" :path="SHARED.REQUIRED" />
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
            <BaseIconSvg width="5" height="10" :path="SHARED.REQUIRED" />
          </template>

          <template #default="{ modelValue, updateModelValue }">
            <BaseInput
              :placeholder="t('auth.inputPassword')"
              :modelValue="modelValue"
              :type="showPassword ? 'text' : 'password'"
              @input="updateModelValue"
            >
              <template #suffix>
                <BaseIconSvg
                  width="20"
                  height="20"
                  :path="
                    showPassword ? MODULES.AUTH.EYE : MODULES.AUTH.EYE_CLOSED
                  "
                  @click="togglePasswordVisibility"
                />
              </template>
            </BaseInput>
          </template>
        </BaseFormItem>

        <BaseButton
          :id="LOGIN_BUTTON"
          type="primary"
          nativeType="submit"
          class="tw-w-full tw-mt-2"
        >
          {{ t('auth.login') }}
        </BaseButton>
      </ElForm>

      <div class="login__register-now">
        <p>{{ t('auth.noAccount') }}</p>
        <RouterLink :to="AUTH.REGISTER">{{ t('auth.registerNow') }}</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/modules/auth/login.scss';
</style>
