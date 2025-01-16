import { ELanguageCode } from '@/models/enums/shared.enum';
import { useLocalStorage } from '@vueuse/core';

const { LANGUAGE } = constants.shared.STORAGE_KEYS;

const useLanguage = () => {
  const { locale } = useI18n();
  const language = useLocalStorage<ELanguageCode>(LANGUAGE, ELanguageCode.English);

  const changeLanguage = (newLang: ELanguageCode) => {
    language.value = newLang;
  };

  const currentLanguage = computed(() => language.value);

  watch(
    language,
    (newLang) => {
      locale.value = newLang;
    },
    { immediate: true },
  );

  return {
    changeLanguage,
    currentLanguage,
  };
};

export default useLanguage;
