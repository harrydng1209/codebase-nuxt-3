<script setup lang="ts">
import { notifications } from '@/mocks/the-default-topbar.mock';
import { ELanguageCode } from '@/models/enums/shared.enum';

const { t } = useI18n();
const { isDark, toggleDark } = useTheme();
const { currentLanguage, toggleLanguage } = useLanguage();

const searchInput = ref<string>();
const i18nOptions = Object.entries(ELanguageCode).map(([key, value]) => ({
  label: key,
  value
}));

const getIconPathForLanguage = (language: ELanguageCode) => {
  const iconPaths = {
    [ELanguageCode.English]: constants.shared.ICON_PATHS.LAYOUTS_ENGLISH,
    [ELanguageCode.Vietnamese]: constants.shared.ICON_PATHS.LAYOUTS_VIETNAMESE,
    [ELanguageCode.Japanese]: constants.shared.ICON_PATHS.LAYOUTS_JAPANESE
  };
  return iconPaths[language];
};
</script>

<template>
  <div class="the-default-topbar">
    <section>
      <BaseInput
        v-model="searchInput"
        :placeholder="`${t('shared.search')}...`"
        class="!tw-w-[200px] tw-shadow-lg"
      >
        <template #suffix>
          <BaseIconSvg :path="constants.shared.ICON_PATHS.LAYOUTS_SEARCH" />
        </template>
      </BaseInput>
    </section>

    <section class="the-default-topbar__profile">
      <BaseIconSvg
        :path="
          isDark
            ? constants.shared.ICON_PATHS.SHARED_LIGHT_MODE
            : constants.shared.ICON_PATHS.SHARED_DARK_MODE
        "
        @click="toggleDark()"
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
              @click="toggleLanguage(item.value)"
            >
              <div class="tw-flex-center tw-gap-2">
                <BaseIconSvg :path="getIconPathForLanguage(item.value)" />
                <span>{{ item.label }}</span>
              </div>
            </ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </BaseDropdown>

      <BaseDropdown>
        <span>
          <ElBadge :value="notifications.length">
            <BaseIconSvg :path="constants.shared.ICON_PATHS.LAYOUTS_NOTIFICATION" />
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
              <span>Clear All</span>
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
@import '@/assets/styles/layouts/the-default-topbar.scss';
</style>
