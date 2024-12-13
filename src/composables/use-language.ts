import { useLocalStorage } from '@vueuse/core';
import { ELanguageCode } from '@/models/enums/shared.enum';

const useLanguage = () => {
  const { locale } = useI18n();
  const currentLanguage = useLocalStorage<ELanguageCode>(
    constants.shared.LOCAL_STORAGE_KEYS.LANGUAGE,
    ELanguageCode.English
  );

  const toggleLanguage = (newLanguage: ELanguageCode) => {
    currentLanguage.value = newLanguage;
  };

  watch(
    currentLanguage,
    (newLang) => {
      locale.value = newLang;
    },
    { immediate: true }
  );

  return {
    currentLanguage: computed(() => currentLanguage.value),
    toggleLanguage
  };
};

export default useLanguage;
