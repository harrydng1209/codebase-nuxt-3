<script setup lang="ts">
import { baseSelectOptions, tableData } from '@/mocks/base-page.mock';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import {
  object as yupObject,
  string as yupString,
  ref as yupRef,
  boolean as yupBoolean
} from 'yup';
import { EToast } from '@/models/enums/shared.enum';
import { useDebounceFn } from '@vueuse/core';
import type { TDate } from '@/models/types/shared.type';

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
    type: yupString().required('Account type is required'),
    terms: yupBoolean().required().isTrue('You must agree to the terms and conditions')
  })
);
const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {}
});

const { t } = useI18n();

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

const handleChangeInput = useDebounceFn((value: string | number) => {
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

const handleCancelDialog = () => {
  baseDialog.value = false;
  utils.shared.showToast('handleCancelDialog', EToast.Error);
};

const handleConfirmDialog = () => {
  baseDialog.value = false;
  utils.shared.showToast('handleConfirmDialog');
};

const handleChangePagination = (currentPage: number, pageSize: number) => {
  utils.shared.showToast(`currentPage: ${currentPage} & pageSize: ${pageSize}`);
};

const onSubmit = handleSubmit((values: unknown) => {
  console.log('onSubmit:', values);
  utils.shared.showToast('onSubmit: check console');
});

const handleGetHealthCheck = useDebounceFn(async () => {
  await apis.shared.healthCheck();
}, 200);
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
      <h4>-- Icons --</h4>
      <div class="tw-flex tw-gap-2">
        <BaseIconSvg
          :path="constants.shared.ICON_PATHS.SHARED_DELETE"
          v-tippy="constants.shared.ICON_PATHS.SHARED_DELETE"
          @click="handleClickIconSvg"
        />
        <BaseIconSvg
          :path="constants.shared.ICON_PATHS.LAYOUTS_SEARCH"
          v-tippy="constants.shared.ICON_PATHS.LAYOUTS_SEARCH"
          @click="handleClickIconSvg"
        />
        <BaseIconSvg
          :path="constants.shared.ICON_PATHS.LAYOUTS_SETTINGS"
          v-tippy="constants.shared.ICON_PATHS.LAYOUTS_SETTINGS"
          @click="handleClickIconSvg"
        />
      </div>
    </section>

    <section>
      <h4>-- Buttons --</h4>
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
              :path="constants.shared.ICON_PATHS.SHARED_DELETE"
            />
          </template>
        </BaseButton>
        <BaseButton type="info" circle @click="handleClickButton">
          <template #icon>
            <BaseIconSvg
              width="14"
              height="14"
              :fill="constants.shared.COLORS.WHITE"
              :path="constants.shared.ICON_PATHS.SHARED_DELETE"
            />
          </template>
        </BaseButton>
        <BaseButton type="success" circle @click="handleClickButton">
          <template #icon>
            <BaseIconSvg
              width="14"
              height="14"
              :fill="constants.shared.COLORS.WHITE"
              :path="constants.shared.ICON_PATHS.SHARED_DELETE"
            />
          </template>
        </BaseButton>
        <BaseButton type="warning" circle @click="handleClickButton">
          <template #icon>
            <BaseIconSvg
              width="14"
              height="14"
              :fill="constants.shared.COLORS.WHITE"
              :path="constants.shared.ICON_PATHS.SHARED_DELETE"
            />
          </template>
        </BaseButton>
        <BaseButton type="danger" circle @click="handleClickButton">
          <template #icon>
            <BaseIconSvg
              width="14"
              height="14"
              :fill="constants.shared.COLORS.WHITE"
              :path="constants.shared.ICON_PATHS.SHARED_DELETE"
            />
          </template>
        </BaseButton>
      </div>
    </section>

    <section>
      <h4>-- Selects --</h4>
      <BaseSelect
        v-model="baseSelect"
        :options="baseSelectOptions"
        @change="handleChangeSelect"
        class="!tw-w-[150px]"
      />
    </section>

    <section>
      <h4>-- Checkboxes --</h4>
      <BaseCheckbox v-model="baseCheckbox" @change="handleChangeCheckbox">
        checkbox label
      </BaseCheckbox>
    </section>

    <section>
      <h4>-- Switches --</h4>
      <BaseSwitch v-model="baseSwitch" activeText="switch label" @change="handleChangeSwitch" />
    </section>

    <section>
      <h4>-- Input --</h4>
      <BaseInput
        v-model="baseInput"
        placeholder="Please input"
        @input="handleChangeInput"
        class="!tw-w-[200px]"
      />
    </section>

    <section>
      <h4>-- DatePickers --</h4>
      <BaseDatePicker
        v-model="baseDatePicker"
        placeholder="Pick a day"
        @change="handleChangeDatePicker"
      />
    </section>

    <section>
      <h4>-- TimePickers --</h4>
      <BaseTimePicker
        v-model="baseTimePicker"
        placeholder="Pick a time"
        @change="handleChangeTimePicker"
      />
    </section>

    <section>
      <h4>-- Dialogs --</h4>
      <BaseButton plain @click="baseDialog = true">Click to open the Dialog</BaseButton>
      <BaseDialog v-model="baseDialog" title="Dialog Title" width="500">
        <span>This is a dialog content</span>
        <template #footer>
          <div class="dialog-footer">
            <BaseButton @click="handleCancelDialog">Cancel</BaseButton>
            <BaseButton type="primary" @click="handleConfirmDialog">Confirm</BaseButton>
          </div>
        </template>
      </BaseDialog>
    </section>

    <section>
      <h4>-- Tables --</h4>
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
      <h4>-- Forms --</h4>
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
              show-password
            />
          </template>
        </BaseFormItem>

        <BaseFormItem name="passwordConfirm" label="Confirm Password">
          <template #default="{ modelValue, updateModelValue }">
            <BaseInput
              placeholder="Confirm password"
              :modelValue="modelValue"
              @input="updateModelValue"
              show-password
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
          <BaseButton type="primary" native-type="submit">Submit</BaseButton>
          <BaseButton type="info" native-type="button" @click="resetForm()">Reset</BaseButton>
        </div>
      </ElForm>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/pages/base-components.scss';
</style>
