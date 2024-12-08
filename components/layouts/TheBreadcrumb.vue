<script lang="ts" setup>
import type { IBreadcrumbItem } from '@/models/interfaces/shared.interface';

interface IProps {
  items: IBreadcrumbItem[];
}

const props = defineProps<IProps>();
</script>

<template>
  <ElBreadcrumb v-bind="$attrs">
    <ElBreadcrumbItem :to="{ path: '/' }">Home</ElBreadcrumbItem>

    <ElBreadcrumbItem v-for="(item, index) in props.items" :key="index" :to="item.to">
      {{ item.text }}
    </ElBreadcrumbItem>
  </ElBreadcrumb>
</template>
