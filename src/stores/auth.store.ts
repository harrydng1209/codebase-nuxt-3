import type { IUserInfo } from '@/models/interfaces/auth.interface';

import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

const { AUTH } = constants.routePages;
const { ACCESS_TOKEN } = constants.shared.STORAGE_KEYS;
const { isSuccessResponse } = utils.shared;

const useAuthStore = defineStore('authStore', () => {
  const router = useRouter();
  const accessToken = useLocalStorage(ACCESS_TOKEN, '');

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

        const isLoggedIn = !!accessToken.value;
        if (!isLoggedIn) return;

        try {
          const response = await apis.auth.profile();
          if (!isSuccessResponse(response)) throw new Error(response.error.message);

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
          if (!isSuccessResponse(response)) throw new Error(response.error.message);

          accessToken.value = response.data.accessToken;
        } catch (error) {
          result = false;
          console.error(error);
          await router.push(AUTH.LOGIN);
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
