<script setup lang="ts">
const slots: ReturnType<typeof useSlots> = useSlots();
</script>

<template>
  <ElCheckbox :class="{ 'no-slot': !slots.default }" v-bind="$attrs">
    <slot />
  </ElCheckbox>
</template>
