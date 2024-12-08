<script setup lang="ts">
interface IProps {
  data: unknown[];
  loading?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  loading: false
});
</script>

<template>
  <ElTable
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

  <div class="tw-flex-center tw-mt-2">
    <slot name="tfoot" />
  </div>
</template>
