<script setup lang="ts">
import type { ElTimePicker } from 'element-plus';

const innerRef = ref<InstanceType<typeof ElTimePicker> | null>(null);

defineExpose({ innerRef });
</script>

<template>
  <ElTimePicker ref="innerRef" v-bind="$attrs" />
</template>
