<script setup lang="ts">
import type { ElTable } from 'element-plus';

interface IProps {
  data: unknown[];
  loading?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  loading: false
});

const innerRef = ref<InstanceType<typeof ElTable> | null>(null);

defineExpose({ innerRef });
</script>

<template>
  <ElTable
    ref="innerRef"
    :data="props.data"
    :defaultExpandAll="true"
    :border="true"
    v-loading="props.loading"
    v-bind="$attrs"
  >
    <slot />

    <template #empty>
      <div class="tw-flex-center tw-flex-col">
        <p>No Data</p>
      </div>
    </template>
  </ElTable>

  <div class="tw-flex-center tw-mt-4">
    <slot name="tfoot" />
  </div>
</template>
