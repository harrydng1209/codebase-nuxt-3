import { useDark } from '@vueuse/core';
import { useToggle } from '@vueuse/shared';

const useTheme = () => {
  const isDark = useDark({
    storageKey: constants.shared.STORAGE_KEYS.THEME
  });
  const changeTheme = useToggle(isDark);

  return {
    changeTheme,
    isDark
  };
};

export default useTheme;
