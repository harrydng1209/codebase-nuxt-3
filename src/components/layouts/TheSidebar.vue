<script setup lang="ts">
const { isDark } = useTheme();
const { t } = useI18n();
</script>

<template>
  <div class="the-sidebar">
    <div class="the-sidebar__logo">
      <NuxtLink :to="constants.routePages.HOME">
        <BaseIconSvg :path="constants.iconPaths.SHARED.LOGO" />
      </NuxtLink>
    </div>

    <ElMenu defaultActive="1" :collapse="false" :router="true">
      <ElMenuItem :index="constants.routePages.AUTH.LOGIN">
        <ElIcon>
          <BaseIconSvg
            :path="constants.iconPaths.LAYOUTS.DASHBOARD"
            :fill="isDark ? constants.shared.COLORS.WHITE : constants.shared.COLORS.BLACK"
          />
        </ElIcon>
        <template #title>{{ t('navigator.login') }}</template>
      </ElMenuItem>

      <ElMenuItem :index="constants.routePages.BASE_COMPONENTS">
        <ElIcon>
          <BaseIconSvg
            :path="constants.iconPaths.LAYOUTS.FOLDER_SHARED"
            :fill="isDark ? constants.shared.COLORS.WHITE : constants.shared.COLORS.BLACK"
          />
        </ElIcon>
        <template #title>{{ t('navigator.baseComponents') }}</template>
      </ElMenuItem>
    </ElMenu>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/layouts/the-sidebar.scss';
</style>
