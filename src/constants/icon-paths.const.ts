const iconPaths = {
  LAYOUTS: {
    DASHBOARD: 'layouts/IconDashboard',
    ENGLISH: 'layouts/IconEnglish',
    FOLDER_SHARED: 'layouts/IconFolderShared',
    JAPANESE: 'layouts/IconJapanese',
    NOTIFICATION: 'layouts/IconNotification',
    SEARCH: 'layouts/IconSearch',
    SETTINGS: 'layouts/IconSettings',
    VIETNAMESE: 'layouts/IconVietnamese'
  },

  MODULES: {
    AUTH: {
      EYE: 'modules/auth/IconEye',
      EYE_CLOSED: 'modules/auth/IconEyeClosed'
    }
  },

  SHARED: {
    DARK_MODE: 'shared/IconDarkMode',
    DELETE: 'shared/IconDelete',
    LIGHT_MODE: 'shared/IconLightMode',
    LOGO: 'shared/IconLogo',
    REQUIRED: 'shared/IconRequired'
  }
} as const;

export default iconPaths;
