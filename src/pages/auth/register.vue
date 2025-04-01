<script setup lang="ts">
import type { IRegister } from '@/models/interfaces/auth.interface';

import IconEye from '@/assets/icons/modules/auth/IconEye.svg';
import IconEyeClosed from '@/assets/icons/modules/auth/IconEyeClosed.svg';
import IconRequired from '@/assets/icons/shared/IconRequired.svg';
import { toTypedSchema } from '@vee-validate/yup';
import { useForm } from 'vee-validate';
import { object as yupObject, ref as yupRef, string as yupString } from 'yup';

import { register } from '~/apis/auth.api';
import { AUTH_PAGES } from '~/constants/route-pages.const';
import { REGEXES, SELECTORS } from '~/constants/shared.const';

definePageMeta({
  layout: 'guest',
  middleware: 'auth-middleware',
  requiresAuth: false,
  roles: [],
  title: 'Authentication',
});

const schema = yupObject({
  displayName: yupString()
    .required('Display name is required')
    .matches(REGEXES.DISPLAY_NAME, 'Name can only contain letters and spaces'),
  email: yupString()
    .required('Email is required')
    .email('Invalid email format')
    .matches(REGEXES.EMAIL, 'Invalid email format'),
  password: yupString()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
  passwordConfirm: yupString()
    .required('Confirm password is required')
    .oneOf([yupRef('password')], 'Passwords must match'),
  username: yupString()
    .required('Username is required')
    .matches(REGEXES.USERNAME, 'Username can only contain letters and numbers'),
});
const { handleSubmit, setFieldError } = useForm<IRegister>({
  initialValues: {
    displayName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    username: '',
  },
  validationSchema: toTypedSchema(schema),
});
const { t } = useI18n();
const router = useRouter();
const { handleCatchError } = useHandleCatchError();

const isShowPassword = ref<boolean>(false);
const isShowPasswordConfirm = ref<boolean>(false);

const toggleIsShowPassword = () => {
  isShowPassword.value = !isShowPassword.value;
};

const toggleIsShowPasswordConfirm = () => {
  isShowPasswordConfirm.value = !isShowPasswordConfirm.value;
};

const onSubmit = handleSubmit(async (values) => {
  try {
    await register(values);
    await router.push(AUTH_PAGES.LOGIN);
  } catch (error) {
    const errorData = handleCatchError<{ fields: (keyof IRegister)[] }>(error);
    if (errorData?.fields && Array.isArray(errorData.fields))
      errorData.fields.forEach((field) => {
        setFieldError(field, `${field} is already taken`);
      });
  }
});
</script>

<template>
  <div class="container">
    <section :id="SELECTORS.REGISTER_SECTION">
      <h4>{{ t('auth.register') }}</h4>

      <ElForm
        labelWidth="auto"
        labelPosition="top"
        hideRequiredAsterisk
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

        <BaseFormItem name="passwordConfirm">
          <template #label>
            <span>{{ t('auth.passwordConfirm') }}</span>
            <IconRequired />
          </template>

          <template #default="{ modelValue, updateModelValue }">
            <BaseInput
              :placeholder="t('auth.inputPassword')"
              :modelValue="modelValue"
              :type="isShowPasswordConfirm ? 'text' : 'password'"
              @input="updateModelValue"
            >
              <template #suffix>
                <component
                  :is="isShowPasswordConfirm ? IconEye : IconEyeClosed"
                  @click="toggleIsShowPasswordConfirm"
                />
              </template>
            </BaseInput>
          </template>
        </BaseFormItem>

        <BaseFormItem name="username">
          <template #label>
            <span>{{ t('auth.username') }}</span>
            <IconRequired />
          </template>

          <template #default="{ modelValue, updateModelValue }">
            <BaseInput
              :placeholder="t('auth.enterYourUsername')"
              :modelValue="modelValue"
              @input="updateModelValue"
            />
          </template>
        </BaseFormItem>

        <BaseFormItem name="displayName">
          <template #label>
            <span>{{ t('auth.displayName') }}</span>
            <IconRequired />
          </template>

          <template #default="{ modelValue, updateModelValue }">
            <BaseInput
              :placeholder="t('auth.enterYourDisplayName')"
              :modelValue="modelValue"
              @input="updateModelValue"
            />
          </template>
        </BaseFormItem>

        <BaseButton
          type="primary"
          nativeType="submit"
          class="tw-w-full tw-mt-2"
        >
          {{ t('auth.register') }}
        </BaseButton>
      </ElForm>

      <div class="container__login-now">
        <p>{{ t('auth.hasAccount') }}</p>
        <RouterLink :to="AUTH_PAGES.LOGIN">{{ t('auth.loginNow') }}</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/components/auth/register.scss';
</style>
