import { useDark } from '@vueuse/core';
import { useToggle } from '@vueuse/shared';

import { STORAGE_KEYS } from '~/constants/shared.const';

export const useTheme = () => {
  const isDark = useDark({
    storageKey: STORAGE_KEYS.THEME,
  });
  const changeTheme = useToggle(isDark);

  const theme = computed(() => (isDark.value ? 'DARK' : 'LIGHT'));

  return {
    changeTheme,
    isDark,
    theme,
  };
};
