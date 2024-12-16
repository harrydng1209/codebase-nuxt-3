<script setup lang="ts">
import type { FieldMeta } from 'vee-validate';

import { useField } from 'vee-validate';

interface IProps {
  label?: string;
  name: string;
}

const props = withDefaults(defineProps<IProps>(), {
  label: ''
});

const attrs = useAttrs();
const { errorMessage, meta, value: modelValue } = useField(props.name);

const getVeeValidateConfig = (meta: FieldMeta<unknown>, errorMessage: string | undefined) => {
  return {
    error: errorMessage,
    required: meta.required,
    validateEvent: false
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
    <template v-for="(_, name) in $slots" :key="name" #[name]>
      <slot
        :name="name"
        :modelValue="modelValue"
        :updateModelValue="(value: any) => updateModelValue(value)"
      />
    </template>
  </ElFormItem>
</template>
