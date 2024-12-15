import useAuthStore from '@/stores/auth.store';

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore();
  await authStore.initialize();

  if (!authStore.getAuthenticated) {
    navigateTo(constants.routePages.AUTH.LOGIN);
    return;
  }
});
