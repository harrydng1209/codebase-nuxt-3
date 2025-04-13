import type { ELanguageCode } from '@/models/enums/shared.enum';

export const useLanguage = () => {
  const { locale, setLocale } = useI18n();

  const language = computed(() => locale.value as ELanguageCode);

  const setLanguage = async (newLang: ELanguageCode) => {
    await setLocale(newLang);
  };

  return {
    language,
    setLanguage,
  };
};
