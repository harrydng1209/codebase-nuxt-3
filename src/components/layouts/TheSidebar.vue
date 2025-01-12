<script setup lang="ts">
const { LAYOUTS, SHARED } = constants.iconPaths;
const { BLACK, WHITE } = constants.shared.COLORS;
const { AUTH, BASE_COMPONENTS, HOME } = constants.routePages;

const { isDark } = useTheme();
const { t } = useI18n();
const route = useRoute();
</script>

<template>
  <div class="the-sidebar">
    <div class="the-sidebar__logo">
      <NuxtLink :to="HOME">
        <BaseIconSvg :path="SHARED.LOGO" />
      </NuxtLink>
    </div>

    <ElMenu :defaultActive="route.path" :collapse="false" :router="true">
      <ClientOnly>
        <ElMenuItem :index="AUTH.LOGIN">
          <ElIcon>
            <BaseIconSvg :path="LAYOUTS.DASHBOARD" :fill="isDark ? WHITE : BLACK" />
          </ElIcon>
          <template #title>{{ t('shared.navigator.login') }}</template>
        </ElMenuItem>
      </ClientOnly>

      <ClientOnly>
        <ElMenuItem :index="BASE_COMPONENTS">
          <ElIcon>
            <BaseIconSvg :path="LAYOUTS.FOLDER_SHARED" :fill="isDark ? WHITE : BLACK" />
          </ElIcon>
          <template #title>{{ t('shared.navigator.base-components') }}</template>
        </ElMenuItem>
      </ClientOnly>
    </ElMenu>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/layouts/the-sidebar.scss';
</style>
