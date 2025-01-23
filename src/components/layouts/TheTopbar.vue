<script setup lang="ts">
import TheBreadcrumb from '@/components/layouts/TheBreadcrumb.vue';
import { notifications } from '@/mocks/the-topbar.mock';
import { ELanguageCode } from '@/models/enums/shared.enum';
import useAuthStore from '@/stores/auth.store';

const { LAYOUTS, SHARED } = constants.iconPaths;
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
    [ELanguageCode.English]: LAYOUTS.ENGLISH,
    [ELanguageCode.Japanese]: LAYOUTS.JAPANESE,
    [ELanguageCode.Vietnamese]: LAYOUTS.VIETNAMESE,
  };
  return iconPaths[lang];
};

const handleLogout = async () => {
  authStore.logout();
  await router.push(AUTH.LOGIN);
};
</script>

<template>
  <div class="the-topbar">
    <section>
      <TheBreadcrumb />
    </section>

    <section class="the-topbar__profile">
      <BaseIconSvg
        :path="isDark ? SHARED.LIGHT_MODE : SHARED.DARK_MODE"
        :fill="themeColors[theme].ICON_SVG"
        @click="changeTheme()"
      />

      <BaseDropdown>
        <span>
          <BaseIconSvg :path="getIconPathForLanguage(language)" />
        </span>

        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem
              v-for="(item, index) in i18nOptions"
              :key="index"
              @click="setLanguage(item.value)"
            >
              <div class="tw-flex-center tw-gap-2">
                <BaseIconSvg :path="getIconPathForLanguage(item.value)" />
                <p>{{ item.label }}</p>
              </div>
            </ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </BaseDropdown>

      <BaseDropdown>
        <span>
          <ElBadge :value="notifications.length">
            <BaseIconSvg
              :path="LAYOUTS.NOTIFICATION"
              :fill="themeColors[theme].ICON_SVG"
            />
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
</template>

<style scoped lang="scss">
@import '@/assets/styles/layouts/the-topbar.scss';
</style>
