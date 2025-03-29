<script setup lang="ts">
import { HOME } from '@/constants/route-pages.const';

const router = useRouter();
</script>

<template>
  <div class="tw-fixed-center tw-flex-center tw-flex-col">
    <h6 class="tw-mb-[16px]">This screen does not exist</h6>
    <BaseButton @click="router.push(HOME)">Go to home screen</BaseButton>
  </div>
</template>
