<script setup lang="ts">
import type { ElDropdown } from 'element-plus';

const slots: ReturnType<typeof useSlots> = useSlots();

const innerRef = ref<InstanceType<typeof ElDropdown> | null>(null);

defineExpose({ innerRef });
</script>

<template>
  <ElDropdown ref="innerRef" trigger="click" v-bind="$attrs">
    <template v-for="(_, name) in slots" :key="name" #[name]>
      <slot :name="name" />
    </template>
  </ElDropdown>
</template>
