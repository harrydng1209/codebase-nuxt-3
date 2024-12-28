<script setup lang="ts">
import type { ElInput } from 'element-plus';

const slots: Slots = useSlots();

const innerRef = ref<InstanceType<typeof ElInput> | null>(null);

defineExpose({ innerRef });
</script>

<template>
  <ElInput ref="innerRef" v-bind="$attrs">
    <template v-for="(_, name) in slots" :key="name" #[name]>
      <slot :name="name" />
    </template>
  </ElInput>
</template>
