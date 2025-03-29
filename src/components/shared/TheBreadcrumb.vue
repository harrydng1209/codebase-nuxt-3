<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

import { HOME } from '~/constants/route-pages.const';

interface IBreadcrumbs {
  text: string;
  to: RouteLocationRaw;
}

const { t } = useI18n();
const route = useRoute();

const breadcrumbs = ref<IBreadcrumbs[]>([]);

watch(
  route,
  () => {
    const pathNames = route.path.split('/').filter((item) => item);
    breadcrumbs.value = pathNames.map((path) => ({
      text: t(`shared.navigator.${path}`),
      to: `/${path}`,
    }));
  },
  { immediate: true },
);
</script>

<template>
  <ElBreadcrumb>
    <ElBreadcrumbItem v-if="breadcrumbs.length > 0" :to="{ path: HOME }">
      {{ t('shared.navigator.home') }}
    </ElBreadcrumbItem>

    <ElBreadcrumbItem
      v-for="(item, index) in breadcrumbs"
      :key="index"
      :to="item.to"
    >
      {{ item.text }}
    </ElBreadcrumbItem>
  </ElBreadcrumb>
</template>
