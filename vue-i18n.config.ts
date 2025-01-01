import { ELanguageCode } from '@/models/enums/shared.enum';

import type { TObjectString } from '~/models/types/shared.type';

type TLocales = Record<string, { default: TObjectString }>;
type TMessages = Record<ELanguageCode, TObjectString>;

const locales: TLocales = import.meta.glob('@/locales/**/*.json', {
  eager: true
});

const messages: TMessages = Object.values(ELanguageCode).reduce((acc, lang) => {
  acc[lang] = {};
  return acc;
}, {} as TMessages);

Object.keys(locales).forEach((path) => {
  const match = path.match(/\/locales\/(.*?)\/(.*?)\.json$/);

  if (!match || !match[1] || !match[2]) return;

  const locale = match[1] as ELanguageCode;
  const data = locales[path].default;

  if (!Object.values(ELanguageCode).includes(locale)) return;

  Object.assign(messages[locale], data);
});

export default defineI18nConfig(() => ({
  legacy: false,
  locale: ELanguageCode.English,
  messages
}));
