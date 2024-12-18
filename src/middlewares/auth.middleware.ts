import useAuthStore from '@/stores/auth.store';

import type { ERole } from '~/models/enums/auth.enum';

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();

  useHead({
    title: to.meta.title || 'Code Base Nuxt 3'
  });

  if (to.meta.requiresAuth) {
    await authStore.initialize();

    if (!authStore.getAuthenticated) return navigateTo(constants.routePages.AUTH.LOGIN);

    const requiresRoles = to.meta.roles as ERole[];
    const userRole = authStore.getUserInfo?.role;
    const hasRequiredRole = requiresRoles?.some((role) => role === userRole);

    if (requiresRoles.length && !hasRequiredRole) return navigateTo(constants.routePages.FORBIDDEN);
  }
});
