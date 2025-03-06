<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

export interface IBreadcrumbItem {
  text: string;
  to: RouteLocationRaw;
}

const { HOME } = constants.routePages;

const { t } = useI18n();
const route = useRoute();

const items = ref<IBreadcrumbItem[]>([]);

watch(
  route,
  () => {
    const pathNames = route.path.split('/').filter((item) => item);
    items.value = pathNames.map((path) => ({
      text: t(`shared.navigator.${path}`),
      to: `/${path}`,
    }));
  },
  { immediate: true },
);
</script>

<template>
  <ElBreadcrumb>
    <ElBreadcrumbItem v-if="items.length > 0" :to="{ path: HOME }">
      {{ t('shared.navigator.home') }}
    </ElBreadcrumbItem>

    <ElBreadcrumbItem v-for="(item, index) in items" :key="index" :to="item.to">
      {{ item.text }}
    </ElBreadcrumbItem>
  </ElBreadcrumb>
</template>
