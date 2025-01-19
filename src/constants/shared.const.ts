const shared = {
  COLORS: {
    BLACK: '#000',
    PRIMARY: '#01c0c8',
    WHITE: '#fff',
  },

  ERROR_CODES: {
    ERR_500: 'ERR_500',
  },

  NODE_ENVS: {
    DEVELOP: 'develop',
    PRODUCTION: 'production',
    STAGING: 'staging',
    TESTING: 'testing',
  },

  REGEXES: {
    ALPHA_NUMERIC: /^[a-zA-Z0-9]+$/,
    ALPHABET: /^[a-zA-Z]+$/,
    DATE: /^(19|20)\d\d[-/](0[1-9]|1[0-2])[-/](0[1-9]|[12][0-9]|3[01])$/,
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    IP_ADDRESS:
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
    PHONE: /^\+?[1-9]\d{1,14}$/,
    TIME: /^([01]\d|2[0-3]):([0-5]\d)$/,
    URL: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ;,./?%&=]*)?$/,
    USERNAME: /^[a-zA-Z0-9_]{3,16}$/,
  },

  SELECTORS: {
    APIS_SECTION: 'apis-section',
    LOADING_SECTION: 'loading-section',
    LOGIN_BUTTON: 'login-button',
    REGISTER_BUTTON: 'register-button',
  },

  STORAGE_KEYS: {
    ACCESS_TOKEN: 'v-access-token',
    LANGUAGE: 'v-language',
    THEME: 'v-theme',
  },
} as const;

export default shared;
