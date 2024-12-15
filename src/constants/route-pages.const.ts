const routePages = {
  HOME: '/',
  FORBIDDEN: '/access-denied',
  NOT_FOUND: '/doesnt-exist',
  BASE_COMPONENTS: '/base-components',
  AUTH: {
    ROOT: '/auth',
    LOGIN: '/auth/login'
  }
} as const;

export default routePages;
