<script setup lang="ts">
const slots: Slots = useSlots();
</script>

<template>
  <ElCheckbox :class="{ 'no-slot': !slots.default }" v-bind="$attrs">
    <slot />
  </ElCheckbox>
</template>
