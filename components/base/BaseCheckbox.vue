<template>
  <ElCheckbox :class="{ 'no-slot': !$slots.default }" v-bind="$attrs">
    <slot />
  </ElCheckbox>
</template>
