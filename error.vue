<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
  error: Object as () => NuxtError
});
</script>

<template>
  <div class="tw-fixed-center">
    <h1 class="tw-flex-center">{{ props.error?.statusCode }}</h1>
    <NuxtLink to="/">Go back home</NuxtLink>
  </div>
</template>
