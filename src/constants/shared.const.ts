import { ELanguageCode } from '../models/enums/shared.enum';

export const ERROR_CODES = {
  ERR_500: 'ERR_500',
} as const;

export const NODE_ENVS = {
  DEVELOP: 'develop',
  PRODUCTION: 'production',
  STAGING: 'staging',
  TESTING: 'testing',
} as const;

export const REGEXES = {
  ALPHA_NUMERIC: /^[a-zA-Z0-9]+$/,
  ALPHABET: /^[a-zA-Z]+$/,
  DATE: /^(19|20)\d\d[-/](0[1-9]|1[0-2])[-/](0[1-9]|[12][0-9]|3[01])$/,
  DISPLAY_NAME: /^[a-zA-Z\s]+$/,
  EMAIL: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  IP_ADDRESS:
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
  PHONE: /^\+?[1-9]\d{1,14}$/,
  TIME: /^([01]\d|2[0-3]):([0-5]\d)$/,
  URL: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ;,./?%&=]*)?$/,
  USERNAME: /^[a-zA-Z0-9_]{3,16}$/,
} as const;

export const SELECTORS = {
  APIS_SECTION: 'apis-section',
  LOADING_SECTION: 'loading-section',
  LOGIN_SECTION: 'login-section',
  REGISTER_SECTION: 'register-section',
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'n_access_token',
  LANGUAGE: 'n_language',
  THEME: 'n_theme',
} as const;

export const COOKIE_KEYS = {
  LANGUAGE: 'N_LANGUAGE',
  REFRESH_TOKEN: 'N_REFRESH_TOKEN',
} as const;

export const LANGUAGE_NAMES = {
  [ELanguageCode.English]: 'English',
  [ELanguageCode.Japanese]: 'Japanese',
  [ELanguageCode.Vietnamese]: 'Vietnamese',
} as const;
