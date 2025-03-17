<script setup lang="ts">
import IconDarkMode from '@/assets/icons/shared/IconDarkMode.svg';
import IconEnglish from '@/assets/icons/shared/IconEnglish.svg';
import IconJapanese from '@/assets/icons/shared/IconJapanese.svg';
import IconLightMode from '@/assets/icons/shared/IconLightMode.svg';
import IconNotification from '@/assets/icons/shared/IconNotification.svg';
import IconVietnamese from '@/assets/icons/shared/IconVietnamese.svg';
import { notifications } from '@/mocks/the-topbar.mock';
import { ELanguageCode } from '@/models/enums/shared.enum';
import useAuthStore from '@/stores/auth.store';

const { AUTH } = constants.routePages;
const { themeColors } = constants;

const { changeTheme, isDark, theme } = useTheme();
const { language, setLanguage } = useLanguage();
const router = useRouter();
const authStore = useAuthStore();

const i18nOptions = Object.entries(ELanguageCode).map(([key, value]) => ({
  label: key,
  value,
}));

const getIconPathForLanguage = (lang: ELanguageCode) => {
  const iconPaths = {
    [ELanguageCode.English]: IconEnglish,
    [ELanguageCode.Japanese]: IconJapanese,
    [ELanguageCode.Vietnamese]: IconVietnamese,
  };
  return iconPaths[lang];
};

const handleLogout = async () => {
  authStore.logout();
  await router.push(AUTH.LOGIN);
};
</script>

<template>
  <ClientOnly>
    <div class="container">
      <section>
        <TheBreadcrumb />
      </section>

      <section class="container__menu">
        <component
          :is="isDark ? IconLightMode : IconDarkMode"
          :fill="themeColors[theme].ICON_SVG"
          @click="changeTheme()"
        />

        <BaseDropdown>
          <span>
            <component :is="getIconPathForLanguage(language)" />
          </span>

          <template #dropdown>
            <ElDropdownMenu>
              <ElDropdownItem
                v-for="(item, index) in i18nOptions"
                :key="index"
                @click="setLanguage(item.value)"
              >
                <div class="tw-flex-center tw-gap-2">
                  <component :is="getIconPathForLanguage(item.value)" />
                  <p>{{ item.label }}</p>
                </div>
              </ElDropdownItem>
            </ElDropdownMenu>
          </template>
        </BaseDropdown>

        <BaseDropdown>
          <span>
            <ElBadge :value="notifications.length">
              <IconNotification :fill="themeColors[theme].ICON_SVG" />
            </ElBadge>
          </span>

          <template #dropdown>
            <ElDropdownMenu>
              <ElDropdownItem
                v-for="notification in notifications"
                :key="notification.id"
              >
                <div>
                  <p>{{ notification.message }}</p>
                  <p>{{ notification.time }}</p>
                </div>
              </ElDropdownItem>

              <ElDropdownItem divided>
                <p>Clear All</p>
              </ElDropdownItem>
            </ElDropdownMenu>
          </template>
        </BaseDropdown>

        <BaseDropdown>
          <span><ElAvatar>H</ElAvatar></span>

          <template #dropdown>
            <ElDropdownMenu>
              <ElDropdownItem>Profile</ElDropdownItem>
              <ElDropdownItem>Settings</ElDropdownItem>
              <ElDropdownItem divided @click="handleLogout">
                Logout
              </ElDropdownItem>
            </ElDropdownMenu>
          </template>
        </BaseDropdown>
      </section>
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
.container {
  height: var(--el-header-height);
  background-color: var(--v-background-content-color);
  @include flexbox-style(0, space-between, center);

  &__menu {
    @include flexbox-style(30px, space-between, center);
  }
}
</style>
