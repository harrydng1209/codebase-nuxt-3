import type { IUserInfo } from '@/models/interfaces/auth.interface';

import { defineStore } from 'pinia';

const { STORAGE_KEYS } = constants.shared;

const useAuthStore = defineStore('authStore', () => {
  const accessToken = useCookie(STORAGE_KEYS.ACCESS_TOKEN);

  const isAuthenticated = ref<boolean>(false);
  const userInfo = ref<IUserInfo>();

  const getGetters = () => {
    return {
      getAuthenticated: computed(() => isAuthenticated.value),
      getUserInfo: computed(() => userInfo.value),
      getUserRole: computed(() => userInfo.value?.role),
    };
  };

  const getActions = () => {
    return {
      initialize: async () => {
        if (isAuthenticated.value) return;

        const isLoggedIn = Boolean(accessToken.value);
        if (!isLoggedIn) return;

        try {
          const response = await apis.auth.profile();
          getActions().setUser(response.data);
        } catch (error) {
          console.error(error);
        }
      },

      logout: () => {
        isAuthenticated.value = false;
        userInfo.value = undefined;
        accessToken.value = null;
      },

      refreshToken: async (): Promise<boolean> => {
        let result = true;
        try {
          const response = await apis.auth.refreshToken();
          accessToken.value = response.data.accessToken;
        } catch (error) {
          console.error(error);
          result = false;
        }
        return result;
      },

      setToken: (token: string) => {
        accessToken.value = token;
      },

      setUser: (data: IUserInfo) => {
        isAuthenticated.value = true;
        userInfo.value = data;
      },
    };
  };

  return { ...getGetters(), ...getActions() };
});

export default useAuthStore;
