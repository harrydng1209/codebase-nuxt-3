<script setup lang="ts">
import type { ElSwitch } from 'element-plus';

const innerRef = ref<InstanceType<typeof ElSwitch> | null>(null);

defineExpose({ innerRef });
</script>

<template>
  <ElSwitch ref="innerRef" v-bind="$attrs">
    <template v-for="(_, name) in $slots" :key="name" #[name]>
      <slot :name="name" />
    </template>
  </ElSwitch>
</template>
