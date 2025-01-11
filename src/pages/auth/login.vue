<script setup lang="ts">
import type { ILogin } from '@/models/interfaces/auth.interface';

import useAuthStore from '@/stores/auth.store';
import { toTypedSchema } from '@vee-validate/yup';
import { useForm } from 'vee-validate';
import { object as yupObject, string as yupString } from 'yup';

const { MODULES, SHARED } = constants.iconPaths;

definePageMeta({
  layout: 'guest',
  middleware: 'auth-middleware',
  requiresAuth: false,
  roles: [],
  title: 'Authentication'
});

const { t } = useI18n();
const authStore = useAuthStore();
const router = useRouter();

const schema = toTypedSchema(
  yupObject({
    email: yupString()
      .required('Email is required')
      .email('Invalid email format')
      .matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Custom email regex validation failed'),
    password: yupString()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long')
  })
);
const { handleSubmit } = useForm<ILogin>({
  initialValues: {},
  validationSchema: schema
});

const showPassword = ref<boolean>(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await apis.auth.login(values);
    if (!utils.shared.isSuccessResponse(response)) throw new Error(response.error.message);

    authStore.setToken(response.data.accessToken);
    await router.push(constants.routePages.HOME);
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div class="login">
    <section>
      <h4>{{ t('auth.login') }}</h4>

      <ElForm
        @submit="onSubmit"
        labelWidth="auto"
        labelPosition="top"
        hideRequiredAsterisk
        style="width: 100%"
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
              @input="updateModelValue"
              :type="showPassword ? 'text' : 'password'"
            >
              <template #suffix>
                <BaseIconSvg
                  width="20"
                  height="20"
                  :path="showPassword ? MODULES.AUTH.EYE : MODULES.AUTH.EYE_CLOSED"
                  @click="togglePasswordVisibility"
                />
              </template>
            </BaseInput>
          </template>
        </BaseFormItem>

        <BaseButton
          type="primary"
          nativeType="submit"
          class="tw-w-full"
          :id="constants.shared.SELECTOR_IDS.LOGIN_BUTTON_ID"
        >
          {{ t('auth.login') }}
        </BaseButton>
      </ElForm>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/modules/auth/login.scss';
</style>
