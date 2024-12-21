<script setup lang="ts">
import type { TOptions } from '@/models/types/shared.type';
import type { ElSelect } from 'element-plus';

interface IProps {
  options: TOptions[];
}

const props = defineProps<IProps>();

const innerRef = ref<InstanceType<typeof ElSelect> | null>(null);

defineExpose({ innerRef });
</script>

<template>
  <ElSelect ref="innerRef" v-bind="$attrs">
    <ElOption
      v-for="(item, index) in props.options"
      :key="item.id || index"
      :label="item.label"
      :value="item.value"
    />

    <template v-for="(_, name) in $slots" :key="name" #[name]>
      <slot :name="name" />
    </template>
  </ElSelect>
</template>
