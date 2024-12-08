<script setup lang="ts">
interface IProps {
  total: number;
  pagerCount?: number;
  pageSize?: number;
}

const props = withDefaults(defineProps<IProps>(), {
  pagerCount: 7,
  pageSize: 30
});
</script>

<template>
  <ElPagination
    :pagerCount="props.pagerCount"
    :pageSize="props.pageSize"
    :total="props.total"
    layout="prev, pager, next"
    v-bind="$attrs"
  />
</template>
