<script setup lang="ts">
import TheBreadcrumb from '@/components/layouts/TheBreadcrumb.vue';
import { notifications } from '@/mocks/the-topbar.mock';
import { ELanguageCode } from '@/models/enums/shared.enum';

const { changeTheme, isDark } = useTheme();
const { changeLanguage, currentLanguage } = useLanguage();

const i18nOptions = Object.entries(ELanguageCode).map(([key, value]) => ({
  label: key,
  value
}));

const getIconPathForLanguage = (lang: ELanguageCode) => {
  const iconPaths = {
    [ELanguageCode.English]: constants.iconPaths.LAYOUTS.ENGLISH,
    [ELanguageCode.Japanese]: constants.iconPaths.LAYOUTS.JAPANESE,
    [ELanguageCode.Vietnamese]: constants.iconPaths.LAYOUTS.VIETNAMESE
  };
  return iconPaths[lang];
};
</script>

<template>
  <div class="the-topbar">
    <section>
      <TheBreadcrumb />
    </section>

    <section class="the-topbar__profile">
      <BaseIconSvg
        :path="
          isDark ? constants.iconPaths.SHARED.LIGHT_MODE : constants.iconPaths.SHARED.DARK_MODE
        "
        :fill="isDark ? constants.shared.COLORS.WHITE : constants.shared.COLORS.BLACK"
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
              :path="constants.iconPaths.LAYOUTS.NOTIFICATION"
              :fill="isDark ? constants.shared.COLORS.WHITE : constants.shared.COLORS.BLACK"
            />
          </ElBadge>
        </span>

        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem v-for="notification in notifications" :key="notification.id">
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
            <ElDropdownItem divided>Logout</ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </BaseDropdown>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/layouts/the-topbar.scss';
</style>
