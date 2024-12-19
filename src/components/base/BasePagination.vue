<script setup lang="ts">
interface IProps {
  pagerCount?: number;
  pageSizes?: number[];
  total: number;
}

const props = withDefaults(defineProps<IProps>(), {
  pagerCount: 7,
  pageSizes: () => [100, 200, 300, 400]
});
</script>

<template>
  <ElPagination
    :pagerCount="props.pagerCount"
    :pageSizes="props.pageSizes"
    :defaultPageSize="100"
    :total="props.total"
    layout="total, sizes, prev, pager, next, jumper"
    v-bind="$attrs"
  />
</template>
