<script setup lang="ts">
interface IProps {
  pagerCount?: number;
  pageSize?: number;
  total: number;
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
