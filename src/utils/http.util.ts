import type { IFailureResponse } from '@/models/interfaces/shared.interface';
import type { TLoadingTarget, TSuccessResponse } from '@/models/types/shared.type';

import { EResponseStatus, EToast } from '@/models/enums/shared.enum';
import httpService from '@/services/http.service';
import useAuthStore from '@/stores/auth.store';
import { useLocalStorage } from '@vueuse/core';
import { type AxiosError, type AxiosRequestConfig, type AxiosResponse, isAxiosError } from 'axios';

interface IAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

type TApiMethods = (typeof constants.shared.API_METHODS)[keyof typeof constants.shared.API_METHODS];

const request = async <T = unknown, M = unknown>(
  method: TApiMethods,
  url: string,
  data: unknown,
  config?: AxiosRequestConfig,
  loadingTarget?: TLoadingTarget,
  toastMessage?: string,
): Promise<IFailureResponse | TSuccessResponse<T, M>> => {
  let loadingInstance: null | ReturnType<typeof ElLoading.service> = null;

  try {
    loadingInstance = utils.shared.showLoading(loadingTarget || false);

    const response: AxiosResponse<TSuccessResponse<T, M>> = await httpService[method](
      url,
      data,
      config,
    );
    if (toastMessage) utils.shared.showToast(toastMessage);

    return {
      data: response.data.data,
      meta: response.data.meta,
      status: EResponseStatus.Success,
    } as TSuccessResponse<T, M>;
  } catch (error) {
    let errorMessage = 'An error occurred';
    let errorCode = 500;

    if (isAxiosError(error)) {
      errorMessage = error.response?.data?.error?.message || errorMessage;
      errorCode = error.response?.data?.error?.code || errorCode;
    }
    if (toastMessage) utils.shared.showToast(errorMessage, EToast.Error);

    throw {
      error: {
        code: errorCode,
        message: errorMessage,
      },
      status: EResponseStatus.Failure,
    } as IFailureResponse;
  } finally {
    utils.shared.hideLoading(loadingInstance);
  }
};

const http = {
  del: async <T = unknown, M = unknown>(
    url: string,
    config?: AxiosRequestConfig,
    loadingTarget?: TLoadingTarget,
    toastMessage?: string,
  ) => {
    return await request<T, M>(
      constants.shared.API_METHODS.DELETE,
      url,
      undefined,
      config,
      loadingTarget,
      toastMessage,
    );
  },

  get: async <T = unknown, M = unknown>(
    url: string,
    config?: AxiosRequestConfig,
    loadingTarget?: TLoadingTarget,
    toastMessage?: string,
  ) => {
    return await request<T, M>(
      constants.shared.API_METHODS.GET,
      url,
      undefined,
      config,
      loadingTarget,
      toastMessage,
    );
  },

  handleUnauthorizedError: async (error: AxiosError) => {
    const authStore = useAuthStore();
    const isSuccess = await authStore.refreshToken();

    if (isSuccess) {
      const accessToken = useLocalStorage(constants.shared.STORAGE_KEYS.ACCESS_TOKEN, '').value;
      const originalRequest = error.config as IAxiosRequestConfig;

      if (originalRequest) {
        originalRequest.headers!.Authorization = `Bearer ${accessToken}`;

        if (!originalRequest._retry) {
          originalRequest._retry = true;
          httpService(originalRequest);
        }
      }
    }
  },

  patch: async <T = unknown, M = unknown>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
    loadingTarget?: TLoadingTarget,
    toastMessage?: string,
  ) => {
    return await request<T, M>(
      constants.shared.API_METHODS.PATCH,
      url,
      data,
      config,
      loadingTarget,
      toastMessage,
    );
  },

  post: async <T = unknown, M = unknown>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
    loadingTarget?: TLoadingTarget,
    toastMessage?: string,
  ) => {
    return await request<T, M>(
      constants.shared.API_METHODS.POST,
      url,
      data,
      config,
      loadingTarget,
      toastMessage,
    );
  },

  put: async <T = unknown, M = unknown>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
    loadingTarget?: TLoadingTarget,
    toastMessage?: string,
  ) => {
    return await request<T, M>(
      constants.shared.API_METHODS.PUT,
      url,
      data,
      config,
      loadingTarget,
      toastMessage,
    );
  },
};

export default http;
