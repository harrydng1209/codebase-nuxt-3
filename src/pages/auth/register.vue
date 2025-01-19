<script setup lang="ts">
import type { IRegister } from '@/models/interfaces/auth.interface';

import { toTypedSchema } from '@vee-validate/yup';
import { useForm } from 'vee-validate';
import { object as yupObject, ref as yupRef, string as yupString } from 'yup';

const { AUTH } = constants.routePages;
const { MODULES, SHARED } = constants.iconPaths;
const { REGISTER_BUTTON } = constants.shared.SELECTORS;

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
    .matches(/^[A-Za-z\s]+$/, 'Name can only contain letters and spaces'),
  email: yupString()
    .required('Email is required')
    .email('Invalid email format')
    .matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email format'),
  password: yupString()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
  passwordConfirm: yupString()
    .required('Confirm password is required')
    .oneOf([yupRef('password')], 'Passwords must match'),
  username: yupString()
    .required('Username is required')
    .matches(/^[A-Za-z0-9]+$/, 'Username can only contain letters and numbers'),
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

const showPassword = ref<boolean>(false);
const showPasswordConfirm = ref<boolean>(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const togglePasswordConfirmVisibility = () => {
  showPasswordConfirm.value = !showPasswordConfirm.value;
};

const onSubmit = handleSubmit(async (values) => {
  try {
    await apis.auth.register(values);
    await router.push(AUTH.LOGIN);
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
  <div class="register">
    <section>
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

        <BaseFormItem name="passwordConfirm">
          <template #label>
            <span>{{ t('auth.passwordConfirm') }}</span>
            <BaseIconSvg width="5" height="10" :path="SHARED.REQUIRED" />
          </template>

          <template #default="{ modelValue, updateModelValue }">
            <BaseInput
              :placeholder="t('auth.inputPassword')"
              :modelValue="modelValue"
              :type="showPasswordConfirm ? 'text' : 'password'"
              @input="updateModelValue"
            >
              <template #suffix>
                <BaseIconSvg
                  width="20"
                  height="20"
                  :path="
                    showPasswordConfirm
                      ? MODULES.AUTH.EYE
                      : MODULES.AUTH.EYE_CLOSED
                  "
                  @click="togglePasswordConfirmVisibility"
                />
              </template>
            </BaseInput>
          </template>
        </BaseFormItem>

        <BaseFormItem name="username">
          <template #label>
            <span>{{ t('auth.username') }}</span>
            <BaseIconSvg width="5" height="10" :path="SHARED.REQUIRED" />
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
            <BaseIconSvg width="5" height="10" :path="SHARED.REQUIRED" />
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
          :id="REGISTER_BUTTON"
          type="primary"
          nativeType="submit"
          class="tw-w-full tw-mt-2"
        >
          {{ t('auth.register') }}
        </BaseButton>
      </ElForm>

      <div class="register__login-now">
        <p>{{ t('auth.hasAccount') }}</p>
        <RouterLink :to="AUTH.LOGIN">{{ t('auth.loginNow') }}</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/modules/auth/register.scss';
</style>
