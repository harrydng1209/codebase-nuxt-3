import { useDark } from '@vueuse/core';
import { useToggle } from '@vueuse/shared';

const { THEME } = constants.shared.STORAGE_KEYS;

const useTheme = () => {
  const isDark = useDark({
    storageKey: THEME,
  });
  const changeTheme = useToggle(isDark);

  return {
    changeTheme,
    isDark,
  };
};

export default useTheme;
