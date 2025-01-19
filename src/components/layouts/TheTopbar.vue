<script setup lang="ts">
import TheBreadcrumb from '@/components/layouts/TheBreadcrumb.vue';
import { notifications } from '@/mocks/the-topbar.mock';
import { ELanguageCode } from '@/models/enums/shared.enum';
import useAuthStore from '@/stores/auth.store';

const { LAYOUTS, SHARED } = constants.iconPaths;
const { BLACK, WHITE } = constants.shared.COLORS;
const { AUTH } = constants.routePages;

const { changeTheme, isDark } = useTheme();
const { changeLanguage, currentLanguage } = useLanguage();
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
        :fill="isDark ? WHITE : BLACK"
        @click="changeTheme()"
      />

      <BaseDropdown>
        <span>
          <BaseIconSvg :path="getIconPathForLanguage(currentLanguage)" />
        </span>

        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem
              v-for="(item, index) in i18nOptions"
              :key="index"
              @click="changeLanguage(item.value)"
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
              :fill="isDark ? WHITE : BLACK"
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
