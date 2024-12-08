<script setup lang="ts">
import { useField } from 'vee-validate';
import type { FieldMeta } from 'vee-validate';

interface IProps {
  name: string;
  label?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  label: ''
});

const attrs = useAttrs();
const { value: modelValue, meta, errorMessage } = useField(props.name);

const getVeeValidateConfig = (meta: FieldMeta<unknown>, errorMessage: string | undefined) => {
  return {
    validateEvent: false,
    error: errorMessage,
    required: meta.required
  };
};

const fieldProps = computed(() => ({
  ...attrs,
  ...getVeeValidateConfig(meta, errorMessage.value)
}));

const updateModelValue = (newValue: unknown) => {
  modelValue.value = newValue;
};
</script>

<template>
  <ElFormItem :label="label" v-bind="fieldProps">
    <slot
      :modelValue="modelValue"
      :updateModelValue="(value: unknown) => updateModelValue(value)"
    />
  </ElFormItem>
</template>
