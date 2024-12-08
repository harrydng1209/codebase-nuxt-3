import { ELanguageCode } from '@/models/enums/shared.enum';

const locales: Record<string, { default: Record<string, string> }> = import.meta.glob(
  '@/locales/**/*.json',
  { eager: true }
);

const messages: Record<ELanguageCode, Record<string, string>> = Object.values(ELanguageCode).reduce(
  (accumulator, language) => {
    accumulator[language] = {};
    return accumulator;
  },
  {} as Record<ELanguageCode, Record<string, string>>
);

Object.keys(locales).forEach((path) => {
  const match = path.match(/\/locales\/(.*?)\/(.*?)\.json$/);

  if (!match || !match[1] || !match[2]) return;

  const locale = match[1] as ELanguageCode;
  const data = locales[path].default;

  if (!Object.values(ELanguageCode).includes(locale)) {
    console.warn(`Locale '${locale}' is not supported.`);
    return;
  }

  Object.assign(messages[locale], data);
});

export default defineI18nConfig(() => ({
  legacy: false,
  locale: ELanguageCode.English,
  messages
}));
