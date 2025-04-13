<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

import { HOME } from '~/constants/route-pages.const';

interface IBreadcrumbs {
  text: string;
  to: RouteLocationRaw;
}

const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();

const breadcrumbs = ref<IBreadcrumbs[]>([]);

watch(
  route,
  () => {
    const pathNames = route.path.split('/').filter((item) => item);
    const segments = pathNames.slice(1);

    breadcrumbs.value = segments.map((path) => ({
      text: t(`shared.navigator.${path}`),
      to: localePath(`/${path}`),
    }));
  },
  { immediate: true },
);
</script>

<template>
  <ElBreadcrumb>
    <ElBreadcrumbItem v-if="breadcrumbs.length > 0" :to="localePath(HOME)">
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
