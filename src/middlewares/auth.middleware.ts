import type { ERole } from '@/models/enums/auth.enum';

import useAuthStore from '@/stores/auth.store';

const { AUTH, FORBIDDEN } = constants.routePages;

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();

  useHead({
    title: String(to.meta.title),
  });

  if (to.meta.requiresAuth) {
    await authStore.initialize();

    if (!authStore.getAuthenticated) return await navigateTo(AUTH.LOGIN);

    const requiresRoles = to.meta.roles as ERole[];
    const userRole = authStore.getUserRole;
    const hasRequiredRole = requiresRoles?.some((role) => role === userRole);

    if (requiresRoles.length && !hasRequiredRole)
      return await navigateTo(FORBIDDEN);
  }
});
