<script setup lang="ts">
import IconDashboard from '@/assets/icons/shared/IconDashboard.svg';
import IconFolderShared from '@/assets/icons/shared/IconFolderShared.svg';
import IconLogo from '@/assets/icons/shared/IconLogo.svg';
import IconSettings from '@/assets/icons/shared/IconSettings.svg';

const { AUTH, BASE_COMPONENTS, HOME } = constants.routePages;
const { themeColors } = constants;

const { theme } = useTheme();
const { t } = useI18n();
const route = useRoute();
</script>

<template>
  <div class="container">
    <div class="container__logo">
      <NuxtLink :to="HOME">
        <IconLogo />
      </NuxtLink>
    </div>

    <ClientOnly>
      <ElMenu :defaultActive="route.path" :collapse="false" :router="true">
        <ElMenuItem :index="AUTH.LOGIN">
          <ElIcon>
            <IconDashboard :fill="themeColors[theme].ICON_SVG" />
          </ElIcon>
          <template #title>{{ t('shared.navigator.login') }}</template>
        </ElMenuItem>

        <ElMenuItem :index="AUTH.REGISTER">
          <ElIcon>
            <IconSettings :fill="themeColors[theme].ICON_SVG" />
          </ElIcon>
          <template #title>{{ t('shared.navigator.register') }}</template>
        </ElMenuItem>

        <ElMenuItem :index="BASE_COMPONENTS">
          <ElIcon>
            <IconFolderShared :fill="themeColors[theme].ICON_SVG" />
          </ElIcon>
          <template #title>
            {{ t('shared.navigator.base-components') }}
          </template>
        </ElMenuItem>
      </ElMenu>
    </ClientOnly>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: calc(100% - 24px);

  .el-menu {
    height: calc(100% - 30px - $layout-margin - (24px * 3));
    border-right: 0;
    background-color: var(--v-background-content-color);
  }

  &__logo {
    width: 24px;
    height: 24px;
    margin: 20px auto;
    cursor: pointer;
    @include flexbox-style;
  }
}
</style>
