import { defineStore } from 'pinia';
import type { IUserInfo } from '@/models/interfaces/shared.interface';
import { useLocalStorage } from '@vueuse/core';

const useAuthStore = defineStore('authStore', () => {
  const accessToken = useLocalStorage(constants.shared.LOCAL_STORAGE_KEYS.ACCESS_TOKEN, '');

  const isAuthenticated = ref<boolean>(false);
  const userInfo = ref<IUserInfo>();
  const maxRetries = 3;
  let retryCount = 0;

  const initialize = async () => {
    if (isAuthenticated.value) return;
    const isLoggedIn = !!accessToken.value;
    if (!isLoggedIn) return;

    try {
      const response = await apis.auth.me();
      if (!utils.shared.isSuccessResponse(response)) throw new Error(response.error.message);

      isAuthenticated.value = true;
      userInfo.value = response.data;
    } catch (_error) {
      const tokenRefreshed = await refreshToken();

      if (tokenRefreshed) {
        retryCount++;

        if (retryCount <= maxRetries) await initialize();
      }
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      const response = await apis.auth.refreshToken();
      if (!utils.shared.isSuccessResponse(response)) throw new Error(response.error.message);

      accessToken.value = response.data.accessToken;
      return true;
    } catch (_error) {
      return false;
    }
  };

  const getGetters = () => {
    return {
      getAuthenticated: computed(() => isAuthenticated.value),
      getUserInfo: computed(() => userInfo.value)
    };
  };

  const getActions = () => {
    return {
      setToken: (token: string) => {
        accessToken.value = token;
      },
      setUser: (data: IUserInfo) => {
        isAuthenticated.value = true;
        userInfo.value = data;
      },
      cleanUser: () => {
        isAuthenticated.value = false;
        userInfo.value = undefined;
      }
    };
  };

  return { ...getGetters(), ...getActions(), initialize };
});

export default useAuthStore;
