<script setup lang="ts">
const { HOME } = constants.routePages;

const router = useRouter();
</script>

<template>
  <div class="tw-fixed-center">
    <h6 class="tw-mb-[16px]">This screen does not exist</h6>
    <BaseButton @click="router.push(HOME)">Go to home screen</BaseButton>
  </div>
</template>
