const routeApis = {
  HEALTH_CHECK: '/health-check',
  AUTH: {
    LOGIN: '/auth/login',
    REFRESH_TOKEN: '/auth/refresh-token',
    ME: '/auth/me'
  }
} as const;

export default routeApis;
