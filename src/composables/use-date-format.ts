import { ERegionalLocale } from '@/models/enums/shared.enum';
import { useDateFormat, type UseDateFormatOptions } from '@vueuse/core';

interface IProps {
  date: Date | number | string;
  format?: TFormat;
}

type TFormat =
  | 'dddd'
  | 'HH:mm'
  | 'HH:mm:ss YYYY/MM/DD (dddd)'
  | 'MM/DD'
  | 'YYYY-MM-DD'
  | 'YYYY/MM/DD'
  | 'YYYY/MM/DD (dddd)'
  | 'YYYY/MM/DD HH:mm';

const useDateFormatByLocales = (props: IProps): ComputedRef<string> => {
  const { date } = props || {};
  let { format = 'YYYY/MM/DD' } = props || {};

  const localeOptions: UseDateFormatOptions = {
    locales: ERegionalLocale.EnglishUS
  };

  switch (true) {
    case localeOptions.locales === ERegionalLocale.JapaneseJP && format === 'YYYY/MM/DD':
    case localeOptions.locales === ERegionalLocale.JapaneseJP && format === 'YYYY/MM/DD HH:mm':
    case localeOptions.locales === ERegionalLocale.JapaneseJP && format === 'YYYY/MM/DD (dddd)':
    case localeOptions.locales === ERegionalLocale.JapaneseJP &&
      format === 'HH:mm:ss YYYY/MM/DD (dddd)':
      format = format
        .replace(/(YYYY\/)/g, 'YYYY年')
        .replace(/(MM\/)/g, 'MM月')
        .replace(/(DD)/g, 'DD日') as TFormat;
      break;

    case localeOptions.locales === ERegionalLocale.JapaneseJP && format === 'YYYY-MM-DD':
      format = format
        .replace(/(YYYY-)/g, 'YYYY年')
        .replace(/(MM-)/g, 'MM月')
        .replace(/(DD)/g, 'DD日') as TFormat;
      break;

    case localeOptions.locales === ERegionalLocale.JapaneseJP && format === 'MM/DD':
      format = format.replace(/(MM\/)/g, 'MM月').replace(/(DD)/g, 'DD日') as TFormat;
      break;
  }

  return useDateFormat(date, format, localeOptions);
};

export default useDateFormatByLocales;
