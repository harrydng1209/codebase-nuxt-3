<script setup lang="ts">
import type { TDate } from '@/models/types/shared.type';

import { baseSelectOptions, tableData } from '@/mocks/base-page.mock';
import { EToast } from '@/models/enums/shared.enum';
import { toTypedSchema } from '@vee-validate/yup';
import { useDebounceFn } from '@vueuse/core';
import { useForm } from 'vee-validate';
import {
  boolean as yupBoolean,
  object as yupObject,
  ref as yupRef,
  string as yupString
} from 'yup';

definePageMeta({
  layout: 'default'
});

await useAsyncData('checkDev', async () => {
  if (import.meta.env.VITE_NODE_ENV !== constants.shared.NODE_ENV.DEVELOPMENT)
    return navigateTo(constants.routePages.AUTH.LOGIN);
});

const schema = toTypedSchema(
  yupObject({
    email: yupString()
      .required('Email is required')
      .email('Invalid email format')
      .matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Custom email regex validation failed'),
    fullName: yupString()
      .required('Full name is required')
      .matches(/^[A-Za-z\s]+$/, 'Name can only contain letters and spaces'),
    password: yupString()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long'),
    passwordConfirm: yupString()
      .required('Password confirmation is required')
      .oneOf([yupRef('password')], 'Passwords must match'),
    terms: yupBoolean().required().isTrue('You must agree to the terms and conditions'),
    type: yupString().required('Account type is required')
  })
);

const { handleSubmit, resetForm } = useForm({
  initialValues: {},
  validationSchema: schema
});
const { t } = useI18n();
const { showConfirm } = useConfirmDialog();
const { isDark } = useTheme();

const baseSelect = ref({ label: 'select label 2', value: 'select value 2' });
const baseCheckbox = ref<boolean>(false);
const baseInput = ref<string>('');
const baseDatePicker = ref<TDate>(Date.now());
const baseTimePicker = ref<TDate>(Date.now());
const baseSwitch = ref<boolean>(true);
const baseDialog = ref<boolean>(false);

const handleClickButton = useDebounceFn(() => {
  utils.shared.showToast('handleClickButton');
}, 200);

const handleChangeSelect = (value: unknown) => {
  utils.shared.showToast(`handleChangeSelect: ${value}`);
};

const handleClickIconSvg = useDebounceFn(() => {
  utils.shared.showToast('handleClickIconSvg');
}, 200);

const handleChangeCheckbox = (value: boolean) => {
  utils.shared.showToast(`handleChangeCheckbox: ${value}`);
};

const handleChangeInput = useDebounceFn((value: number | string) => {
  utils.shared.showToast(`handleChangeInput: ${value}`);
}, 200);

const handleChangeDatePicker = (value: unknown) => {
  utils.shared.showToast(`handleChangeDatePicker: ${value}`);
};

const handleChangeTimePicker = (value: unknown) => {
  utils.shared.showToast(`handleChangeTimePicker: ${value}`);
};

const handleChangeSwitch = (value: boolean) => {
  utils.shared.showToast(`handleChangeSwitch: ${value}`);
};

const handleDialog = () => {
  baseDialog.value = false;
  utils.shared.showToast('handleConfirmDialog', EToast.Info);
};

const handleChangePagination = (currentPage: number, pageSize: number) => {
  utils.shared.showToast(`currentPage: ${currentPage} & pageSize: ${pageSize}`);
};

const onSubmit = handleSubmit((_values: unknown) => {
  utils.shared.showToast('onSubmit: check console');
});

const handleGetHealthCheck = useDebounceFn(async () => {
  await apis.shared.healthCheck();
}, 200);

const confirmDelete = () => {
  showConfirm({
    cancelButtonText: 'No, Cancel',
    confirmButtonText: 'Yes, Delete',
    message: 'Proxy will permanently delete the file. Continue?',
    onCancel: () => {
      utils.shared.showToast('File deletion has been canceled');
    },
    onConfirm: () => {
      utils.shared.showToast('File has been successfully deleted');
    },
    title: 'Warning'
  });
};
</script>

<template>
  <div class="base-components">
    <section>
      <h4>-- i18n --</h4>
      <div class="tw-flex tw-items-center tw-gap-4">
        <p>{{ t('hello') }}</p>
      </div>
    </section>

    <section :id="constants.shared.SELECTOR_IDS.TEST_BUTTON_ID">
      <h4>-- Apis --</h4>
      <BaseButton @click="handleGetHealthCheck">Health Check</BaseButton>
    </section>

    <section>
      <h4>-- Base Icons SVG --</h4>
      <div class="tw-flex tw-gap-2">
        <template v-for="(category, categoryName) in constants.iconPaths" :key="categoryName">
          <template v-for="(iconPath, iconName) in category" :key="iconName">
            <BaseIconSvg
              :path="iconPath"
              :fill="isDark ? constants.shared.COLORS.WHITE : constants.shared.COLORS.BLACK"
              v-tippy="iconPath"
              @click="handleClickIconSvg"
            />
          </template>
        </template>
      </div>
    </section>

    <section>
      <h4>-- Base Buttons --</h4>
      <div class="tw-mb-4">
        <BaseButton type="primary" @click="handleClickButton">Primary</BaseButton>
        <BaseButton type="info" @click="handleClickButton">Info</BaseButton>
        <BaseButton type="success" @click="handleClickButton">Success</BaseButton>
        <BaseButton type="warning" @click="handleClickButton">Warning</BaseButton>
        <BaseButton type="danger" @click="handleClickButton">Danger</BaseButton>
      </div>

      <div class="tw-mb-4">
        <BaseButton type="primary" disabled @click="handleClickButton">Primary</BaseButton>
        <BaseButton type="info" disabled @click="handleClickButton">Info</BaseButton>
        <BaseButton type="success" disabled @click="handleClickButton">Success</BaseButton>
        <BaseButton type="warning" disabled @click="handleClickButton">Warning</BaseButton>
        <BaseButton type="danger" disabled @click="handleClickButton">Danger</BaseButton>
      </div>

      <div class="tw-mb-4">
        <BaseButton type="primary" plain @click="handleClickButton">Primary</BaseButton>
        <BaseButton type="info" plain @click="handleClickButton">Info</BaseButton>
        <BaseButton type="success" plain @click="handleClickButton">Success</BaseButton>
        <BaseButton type="warning" plain @click="handleClickButton">Warning</BaseButton>
        <BaseButton type="danger" plain @click="handleClickButton">Danger</BaseButton>
      </div>

      <div>
        <BaseButton type="primary" circle @click="handleClickButton">
          <template #icon>
            <BaseIconSvg
              width="14"
              height="14"
              :fill="constants.shared.COLORS.WHITE"
              :path="constants.iconPaths.SHARED.DELETE"
            />
          </template>
        </BaseButton>
        <BaseButton type="info" circle @click="handleClickButton">
          <template #icon>
            <BaseIconSvg
              width="14"
              height="14"
              :fill="constants.shared.COLORS.WHITE"
              :path="constants.iconPaths.SHARED.DELETE"
            />
          </template>
        </BaseButton>
        <BaseButton type="success" circle @click="handleClickButton">
          <template #icon>
            <BaseIconSvg
              width="14"
              height="14"
              :fill="constants.shared.COLORS.WHITE"
              :path="constants.iconPaths.SHARED.DELETE"
            />
          </template>
        </BaseButton>
        <BaseButton type="warning" circle @click="handleClickButton">
          <template #icon>
            <BaseIconSvg
              width="14"
              height="14"
              :fill="constants.shared.COLORS.WHITE"
              :path="constants.iconPaths.SHARED.DELETE"
            />
          </template>
        </BaseButton>
        <BaseButton type="danger" circle @click="handleClickButton">
          <template #icon>
            <BaseIconSvg
              width="14"
              height="14"
              :fill="constants.shared.COLORS.WHITE"
              :path="constants.iconPaths.SHARED.DELETE"
            />
          </template>
        </BaseButton>
      </div>
    </section>

    <section>
      <h4>-- Base Selects --</h4>
      <BaseSelect
        v-model="baseSelect"
        :options="baseSelectOptions"
        @change="handleChangeSelect"
        class="!tw-w-[150px]"
      />
    </section>

    <section>
      <h4>-- Base Checkboxes --</h4>
      <BaseCheckbox v-model="baseCheckbox" @change="handleChangeCheckbox">
        checkbox label
      </BaseCheckbox>
    </section>

    <section>
      <h4>-- Base Switches --</h4>
      <BaseSwitch v-model="baseSwitch" activeText="switch label" @change="handleChangeSwitch" />
    </section>

    <section>
      <h4>-- Base Inputs --</h4>
      <BaseInput
        v-model="baseInput"
        placeholder="Please input"
        @input="handleChangeInput"
        class="!tw-w-[200px]"
      />
    </section>

    <section>
      <h4>-- Base DatePickers --</h4>
      <BaseDatePicker
        v-model="baseDatePicker"
        placeholder="Pick a day"
        @change="handleChangeDatePicker"
      />
    </section>

    <section>
      <h4>-- Base TimePickers --</h4>
      <BaseTimePicker
        v-model="baseTimePicker"
        placeholder="Pick a time"
        @change="handleChangeTimePicker"
      />
    </section>

    <section>
      <h4>-- Base Dialogs --</h4>
      <BaseButton @click="baseDialog = true">Open Dialog</BaseButton>
      <BaseDialog v-model="baseDialog" title="Dialog Title" width="500">
        <span>This is a dialog content</span>
        <template #footer>
          <div class="dialog-footer">
            <BaseButton type="primary" @click="handleDialog">OK</BaseButton>
          </div>
        </template>
      </BaseDialog>

      <BaseButton class="tw-ml-4" @click="confirmDelete">Open Confirm Dialog</BaseButton>
    </section>

    <section>
      <h4>-- Base Tables --</h4>
      <BaseTable :data="tableData" height="300" rowKey="date">
        <ElTableColumn type="index" width="50" />
        <ElTableColumn prop="date" label="Date" width="120" />
        <ElTableColumn prop="name" label="Name" width="150" />
        <ElTableColumn prop="address" label="Address" width="200" />
        <ElTableColumn prop="email" label="Email" width="180" />
        <ElTableColumn prop="phone" label="Phone" width="150" />
        <ElTableColumn prop="age" label="Age" width="80" />
        <ElTableColumn prop="occupation" label="Occupation" width="150" />
        <ElTableColumn prop="company" label="Company" width="150" />
        <ElTableColumn prop="salary" label="Salary" width="120" />
        <ElTableColumn prop="department" label="Department" width="150" />
        <ElTableColumn prop="city" label="City" width="120" />
        <ElTableColumn prop="country" label="Country" width="120" />
        <ElTableColumn prop="zipCode" label="Zip Code" width="120" />

        <template #tfoot>
          <BasePagination :total="1000" @change="handleChangePagination" />
        </template>
      </BaseTable>
    </section>

    <section>
      <h4>-- Base Forms --</h4>
      <ElForm @submit="onSubmit" labelWidth="auto">
        <BaseFormItem name="email" label="Email">
          <template #default="{ modelValue, updateModelValue }">
            <BaseInput
              placeholder="Email Address"
              :modelValue="modelValue"
              @input="updateModelValue"
            />
          </template>
        </BaseFormItem>

        <BaseFormItem name="fullName" label="Full name">
          <template #default="{ modelValue, updateModelValue }">
            <BaseInput placeholder="Full name" :modelValue="modelValue" @input="updateModelValue" />
          </template>
        </BaseFormItem>

        <BaseFormItem name="password" label="Password">
          <template #default="{ modelValue, updateModelValue }">
            <BaseInput
              placeholder="Password"
              :modelValue="modelValue"
              @input="updateModelValue"
              showPassword
            />
          </template>
        </BaseFormItem>

        <BaseFormItem name="passwordConfirm" label="Confirm Password">
          <template #default="{ modelValue, updateModelValue }">
            <BaseInput
              placeholder="Confirm password"
              :modelValue="modelValue"
              @input="updateModelValue"
              showPassword
            />
          </template>
        </BaseFormItem>

        <BaseFormItem name="type" label="Type">
          <template #default="{ modelValue, updateModelValue }">
            <BaseSelect
              :modelValue="modelValue"
              @change="updateModelValue"
              placeholder="Select Type"
              :options="baseSelectOptions"
            />
          </template>
        </BaseFormItem>

        <BaseFormItem name="terms">
          <template #default="{ modelValue, updateModelValue }">
            <BaseCheckbox :modelValue="modelValue" @change="updateModelValue">
              Agree to terms and conditions
            </BaseCheckbox>
          </template>
        </BaseFormItem>

        <div>
          <BaseButton type="primary" nativeType="submit">Submit</BaseButton>
          <BaseButton type="info" nativeType="button" @click="resetForm()">Reset</BaseButton>
        </div>
      </ElForm>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/pages/base-components.scss';
</style>
