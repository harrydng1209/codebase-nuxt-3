import { ELanguageCode } from '@/models/enums/shared.enum';
import { useLocalStorage } from '@vueuse/core';

const { STORAGE_KEYS } = constants.shared;

const useLanguage = () => {
  const { locale } = useI18n();
  const languageStorage = useLocalStorage<ELanguageCode>(
    STORAGE_KEYS.LANGUAGE,
    ELanguageCode.English,
  );

  const setLanguage = (newLang: ELanguageCode) => {
    languageStorage.value = newLang;
  };

  const language = computed(() => languageStorage.value);

  watch(
    languageStorage,
    (newLang) => {
      locale.value = newLang;
    },
    { immediate: true },
  );

  return {
    language,
    setLanguage,
  };
};

export default useLanguage;
