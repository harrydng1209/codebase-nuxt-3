<script setup lang="ts">
import type { ElTimePicker } from 'element-plus';

const makeRange = (start: number, end: number) => {
  const result: number[] = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};

const disabledSeconds = () => {
  return makeRange(1, 59);
};

const innerRef = ref<InstanceType<typeof ElTimePicker> | null>(null);

defineExpose({ innerRef });
</script>

<template>
  <ElTimePicker ref="innerRef" :disabledSeconds="disabledSeconds" v-bind="$attrs" />
</template>
