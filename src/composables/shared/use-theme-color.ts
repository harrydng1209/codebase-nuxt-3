import { DARK, LIGHT } from '@/constants/theme-colors.const';

interface ICustomColors {
  DARK?: string;
  LIGHT?: string;
}

const useThemeColor = () => {
  const { theme } = useTheme();

  const getThemeColor = (
    colorName: keyof typeof DARK & keyof typeof LIGHT,
    customColors?: ICustomColors,
  ) => {
    const customColor = customColors?.[theme.value];
    const themeColor =
      theme.value === 'DARK' ? DARK[colorName] : LIGHT[colorName];

    return customColor || themeColor;
  };

  return { getThemeColor };
};

export default useThemeColor;
