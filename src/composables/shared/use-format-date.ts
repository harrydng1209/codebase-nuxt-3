import type { TDate } from '@/models/types/shared.type';

import { ELanguageCode } from '@/models/enums/shared.enum';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';

interface IProps {
  date: TDate;
  format?: TFormat;
  isUTC?: boolean;
  locale?: ELanguageCode;
}

type TFormat =
  | 'dddd'
  | 'HH:mm'
  | 'HH:mm:ss YYYY/MM/DD (dddd)'
  | 'MM/DD'
  | 'MMM DD, YYYY'
  | 'YYYY-MM-DD'
  | 'YYYY/MM/DD'
  | 'YYYY/MM/DD (dddd)'
  | 'YYYY/MM/DD HH:mm';

dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.extend(advancedFormat);

const useFormatDate = () => {
  const formatDate = computed(() => (props: IProps) => {
    const { date, isUTC = false, locale = ELanguageCode.English } = props || {};
    let { format = 'YYYY/MM/DD' } = props || {};

    dayjs.locale(locale);

    if (locale === ELanguageCode.Japanese) {
      switch (format) {
        case 'HH:mm:ss YYYY/MM/DD (dddd)':
        case 'YYYY/MM/DD':
        case 'YYYY/MM/DD (dddd)':
        case 'YYYY/MM/DD HH:mm':
          format = format
            .replace(/(YYYY\/)/g, 'YYYY年')
            .replace(/(MM\/)/g, 'MM月')
            .replace(/(DD)/g, 'DD日') as TFormat;
          break;

        case 'MM/DD':
          format = format
            .replace(/(MM\/)/g, 'MM月')
            .replace(/(DD)/g, 'DD日') as TFormat;
          break;

        case 'YYYY-MM-DD':
          format = format
            .replace(/(YYYY-)/g, 'YYYY年')
            .replace(/(MM-)/g, 'MM月')
            .replace(/(DD)/g, 'DD日') as TFormat;
          break;
      }
    }

    const dayjsDate = isUTC ? dayjs.utc(date) : dayjs(date);
    return dayjsDate.format(format);
  });

  return { formatDate };
};

export default useFormatDate;
