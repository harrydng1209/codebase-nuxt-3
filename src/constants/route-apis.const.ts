const routeApis = {
  AUTH: {
    LOGIN: '/auth/login',
    PROFILE: '/auth/profile',
    REFRESH_TOKEN: '/auth/refresh-token',
    REGISTER: '/auth/register',
  },

  HEALTH_CHECK: '/health-check',
} as const;

export default routeApis;
