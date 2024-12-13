import { useDark } from '@vueuse/core';
import { useToggle } from '@vueuse/shared';

const useTheme = () => {
  const isDark = useDark({
    storageKey: constants.shared.LOCAL_STORAGE_KEYS.THEME
  });
  const toggleDark = useToggle(isDark);

  return {
    isDark,
    toggleDark
  };
};

export default useTheme;
