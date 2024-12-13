import { ERegionalLocale } from '@/models/enums/shared.enum';

const getCurrentTime = () => {
  const localeOptions = {
    locale: ERegionalLocale.EnglishUS,
    options: {
      hour12: false
    }
  };
  const time = new Date().toLocaleTimeString(localeOptions.locale, localeOptions.options);
  const [hours, minutes, seconds] = time.split(':');
  return `${hours} : ${minutes} : ${seconds}`;
};

const useClock = (): Ref<string> => {
  const currentTime = ref<string>(getCurrentTime());
  const timer = ref<ReturnType<typeof setInterval> | undefined>(undefined);

  const updateTime = () => {
    currentTime.value = getCurrentTime();
  };

  onMounted(() => {
    timer.value = setInterval(updateTime, 1000);
  });

  onUnmounted(() => {
    if (timer.value) clearInterval(timer.value);
  });

  return currentTime;
};

export default useClock;
