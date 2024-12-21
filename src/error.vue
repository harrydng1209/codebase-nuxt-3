<script setup lang="ts">
const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="error">
    <h1 class="error__title">Oops! Something went wrong</h1>
    <h5 class="error__message">An unexpected error has occurred</h5>
    <BaseButton class="error__button" @click="goBack">Go Back</BaseButton>
  </div>
</template>

<style scoped lang="scss">
.error {
  width: 100vw;
  height: 100vh;
  @include flexbox-style(12px, center, center, column);
}
</style>
