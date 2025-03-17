<script setup lang="ts">
import type { ElDialog } from 'element-plus';

const slots: ReturnType<typeof useSlots> = useSlots();

const innerRef = ref<InstanceType<typeof ElDialog> | null>(null);

defineExpose({ innerRef });
</script>

<template>
  <ElDialog ref="innerRef" :showClose="false" v-bind="$attrs">
    <template v-for="(_, name) in slots" :key="name" #[name]>
      <slot :name="name" />
    </template>
  </ElDialog>
</template>
