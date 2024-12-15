const iconPaths = {
  SHARED: {
    DELETE: 'shared/IconDelete',
    LIGHT_MODE: 'shared/IconLightMode',
    DARK_MODE: 'shared/IconDarkMode',
    LOGO: 'shared/IconLogo',
    REQUIRED: 'shared/IconRequired'
  },
  LAYOUTS: {
    DASHBOARD: 'layouts/IconDashboard',
    FOLDER_SHARED: 'layouts/IconFolderShared',
    SETTINGS: 'layouts/IconSettings',
    SEARCH: 'layouts/IconSearch',
    NOTIFICATION: 'layouts/IconNotification',
    ENGLISH: 'layouts/IconEnglish',
    VIETNAMESE: 'layouts/IconVietnamese',
    JAPANESE: 'layouts/IconJapanese'
  },
  PAGES: {
    AUTH: {
      EYE: 'pages/auth/IconEye',
      EYE_CLOSED: 'pages/auth/IconEyeClosed'
    }
  }
} as const;

export default iconPaths;
