<script setup lang="ts">
import type { ElInputNumber } from 'element-plus';

const slots: Slots = useSlots();

const innerRef = ref<InstanceType<typeof ElInputNumber> | null>(null);

defineExpose({ innerRef });
</script>

<template>
  <ElInputNumber ref="innerRef" v-bind="$attrs">
    <template v-for="(_, name) in slots" :key="name" #[name]>
      <slot :name="name" />
    </template>
  </ElInputNumber>
</template>
