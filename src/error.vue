<script setup lang="ts">
const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="error">
    <h1>Oops! Something went wrong</h1>
    <h5>An unexpected error has occurred</h5>
    <BaseButton @click="goBack">Go Back</BaseButton>
  </div>
</template>

<style scoped lang="scss">
.error {
  width: 100vw;
  height: 100vh;
  @include flexbox-style(12px, center, center, column);
}
</style>
