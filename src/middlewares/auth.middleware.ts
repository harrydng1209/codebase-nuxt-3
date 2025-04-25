import type { ERole } from '@/models/enums/auth.enum';

import { useAuthStore } from '@/stores/auth.store';

import { AUTH_PAGES, FORBIDDEN } from '~/constants/route-pages.const';

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();

  useHead({
    title: String(to.meta.title),
  });

  if (to.meta.requiresAuth) {
    await authStore.initialize();

    if (!authStore.isAuthenticated) return await navigateTo(AUTH_PAGES.LOGIN);

    const requiresRoles = to.meta.roles as ERole[];
    const userRole = authStore.getUserRole;
    const hasRequiredRole = requiresRoles?.some((role) => role === userRole);

    if (requiresRoles.length && !hasRequiredRole)
      return await navigateTo(FORBIDDEN);
  }
});
