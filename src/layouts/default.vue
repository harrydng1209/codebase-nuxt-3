<script setup lang="ts">
import TheSidebar from '@/components/shared/TheSidebar.vue';
import TheTopbar from '@/components/shared/TheTopbar.vue';
import { useWindowScroll } from '@vueuse/core';

const { y } = useWindowScroll();

const headerStyle = computed(() => ({
  marginTop: y.value > 50 ? '-20px' : '0',
  transition: 'margin-top 0.3s ease',
}));
</script>

<template>
  <ElContainer class="container">
    <ElAside class="container__sidebar">
      <TheSidebar />
    </ElAside>

    <ElContainer class="container__main">
      <ElHeader class="container__main--header" :style="headerStyle">
        <TheTopbar />
      </ElHeader>

      <ElMain class="container__main--content">
        <NuxtPage />
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<style scoped lang="scss">
@import '@/assets/styles/components/default-layout.scss';
</style>
