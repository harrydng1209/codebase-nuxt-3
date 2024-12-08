<script setup lang="ts">
import type { TOptions } from '@/models/types/shared.type';

interface IProps {
  options: TOptions[];
}

const props = defineProps<IProps>();
</script>

<template>
  <ElSelect v-bind="$attrs">
    <ElOption
      v-for="(item, index) in props.options"
      :key="index"
      :label="item.label"
      :value="item.value"
    />
  </ElSelect>
</template>
