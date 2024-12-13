const shared = {
  API_REQUEST_METHODS: {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete',
    PATCH: 'patch'
  },
  HTTP_RESPONSE_STATUS_CODES: {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  },
  REGEX_PATTERNS: {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^\+?[1-9]\d{1,14}$/,
    URL: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ;,./?%&=]*)?$/,
    DATE: /^(19|20)\d\d[-/](0[1-9]|1[0-2])[-/](0[1-9]|[12][0-9]|3[01])$/,
    TIME: /^([01]\d|2[0-3]):([0-5]\d)$/,
    IP_ADDRESS:
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    USERNAME: /^[a-zA-Z0-9_]{3,16}$/,
    PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
    ALPHA_NUMERIC: /^[a-zA-Z0-9]+$/,
    ALPHABET: /^[a-zA-Z]+$/
  },
  COLORS: {
    WHITE: '#fff',
    BLACK: '#000'
  },
  LOCAL_STORAGE_KEYS: {
    ACCESS_TOKEN: 'v-access-token',
    THEME: 'v-theme',
    LANGUAGE: 'v-language'
  },
  ICON_PATHS: {
    SHARED_DELETE: 'shared/IconDelete',
    SHARED_LIGHT_MODE: 'shared/IconLightMode',
    SHARED_DARK_MODE: 'shared/IconDarkMode',
    SHARED_LOGO: 'shared/IconLogo',
    LAYOUTS_DASHBOARD: 'layouts/IconDashboard',
    LAYOUTS_FOLDER_SHARED: 'layouts/IconFolderShared',
    LAYOUTS_SETTINGS: 'layouts/IconSettings',
    LAYOUTS_SEARCH: 'layouts/IconSearch',
    LAYOUTS_NOTIFICATION: 'layouts/IconNotification',
    LAYOUTS_ENGLISH: 'layouts/IconEnglish',
    LAYOUTS_VIETNAMESE: 'layouts/IconVietnamese',
    LAYOUTS_JAPANESE: 'layouts/IconJapanese'
  },
  SELECTOR_IDS: {
    TEST_BUTTON_ID: 'test-button'
  },
  NODE_ENV: {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production'
  },
  ERROR_CODES: {}
} as const;

export default shared;
