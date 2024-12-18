<script setup lang="ts">
import { EToast } from '@/models/enums/shared.enum';
import useAuthStore from '@/stores/auth.store';
import { toTypedSchema } from '@vee-validate/yup';
import { useForm } from 'vee-validate';
import { object as yupObject, string as yupString } from 'yup';

definePageMeta({
  layout: 'guest',
  middleware: 'auth-middleware',
  requiresAuth: false,
  roles: [],
  title: 'Authentication'
});

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

const { t } = useI18n();
const authStore = useAuthStore();
const router = useRouter();
const { handleSubmit } = useForm({
  initialValues: {},
  validationSchema: schema
});

const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const onSubmit = handleSubmit(async (values: unknown) => {
  try {
    const response = await apis.auth.login(values);
    if (!utils.shared.isSuccessResponse(response)) throw new Error(response.error.message);

    authStore.setToken(response.data.accessToken);
    await router.push(constants.routePages.HOME);
  } catch (_error: unknown) {
    utils.shared.showToast('Login error', EToast.Error);
  }
});
</script>

<template>
  <div class="login">
    <section>
      <h4>{{ t('auth.login') }}</h4>

      <ElForm @submit="onSubmit" labelWidth="auto" labelPosition="top" hideRequiredAsterisk>
        <BaseFormItem name="email">
          <template #label>
            <span>{{ t('auth.email') }}</span>
            <BaseIconSvg width="5" height="10" :path="constants.iconPaths.SHARED.REQUIRED" />
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
            <BaseIconSvg width="5" height="10" :path="constants.iconPaths.SHARED.REQUIRED" />
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
                  :path="
                    showPassword
                      ? constants.iconPaths.PAGES.AUTH.EYE
                      : constants.iconPaths.PAGES.AUTH.EYE_CLOSED
                  "
                  @click="togglePasswordVisibility"
                />
              </template>
            </BaseInput>
          </template>
        </BaseFormItem>

        <div>
          <BaseButton
            type="primary"
            nativeType="submit"
            class="tw-w-full"
            :id="constants.shared.SELECTOR_IDS.LOGIN_BUTTON_ID"
          >
            {{ t('auth.login') }}
          </BaseButton>
        </div>
      </ElForm>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/pages/auth/login.scss';
</style>
