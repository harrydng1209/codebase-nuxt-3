const routeApis = {
  AUTH: {
    LOGIN: '/auth/login',
    ME: '/auth/me',
    REFRESH_TOKEN: '/auth/refresh-token',
  },

  HEALTH_CHECK: '/health-check',
} as const;

export default routeApis;
