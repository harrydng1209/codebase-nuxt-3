<script setup lang="ts">
import type { ElDatePicker } from 'element-plus';

const slots: ReturnType<typeof useSlots> = useSlots();

const innerRef = ref<InstanceType<typeof ElDatePicker> | null>(null);

defineExpose({ innerRef });
</script>

<template>
  <ElDatePicker ref="innerRef" v-bind="$attrs">
    <template v-for="(_, name) in slots" :key="name" #[name]>
      <slot :name="name" />
    </template>
  </ElDatePicker>
</template>
