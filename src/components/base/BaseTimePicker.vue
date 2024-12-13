<script setup lang="ts">
const makeRange = (start: number, end: number) => {
  const result: number[] = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};

const disabledSeconds = () => {
  return makeRange(1, 59);
};
</script>

<template>
  <ElTimePicker :disabledSeconds="disabledSeconds" v-bind="$attrs" />
</template>
