const routePages = {
  AUTH: {
    LOGIN: '/auth/login',
    ROOT: '/auth'
  },

  BASE_COMPONENTS: '/base-components',
  FORBIDDEN: '/access-denied',
  HOME: '/',
  NOT_FOUND: '/doesnt-exist'
} as const;

export default routePages;
