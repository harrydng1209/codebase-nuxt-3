import { useDark } from '@vueuse/core';
import { useToggle } from '@vueuse/shared';

const { STORAGE_KEYS } = constants.shared;

const useTheme = () => {
  const isDark = useDark({
    storageKey: STORAGE_KEYS.THEME,
    valueDark: 'dark',
    valueLight: 'light',
  });
  const changeTheme = useToggle(isDark);

  const theme = computed(() => (isDark.value ? 'DARK' : 'LIGHT'));

  return {
    changeTheme,
    isDark,
    theme,
  };
};

export default useTheme;
