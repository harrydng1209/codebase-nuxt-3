import type { IFailureResponse } from '@/models/interfaces/shared.interface';
import type { TLoadingTarget, TSuccessResponse } from '@/models/types/shared.type';

import { EResponseStatus, EToast } from '@/models/enums/shared.enum';
import httpService from '@/services/http.service';
import useAuthStore from '@/stores/auth.store';
import { useLocalStorage } from '@vueuse/core';
import { type AxiosError, type AxiosRequestConfig, type AxiosResponse, isAxiosError } from 'axios';

const { ACCESS_TOKEN } = constants.shared.STORAGE_KEYS;
const { DELETE, GET, PATCH, POST, PUT } = constants.shared.HTTP_METHODS;
const { hideLoading, showLoading, showToast } = utils.shared;

interface IAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

type THttpMethods =
  (typeof constants.shared.HTTP_METHODS)[keyof typeof constants.shared.HTTP_METHODS];

const request = async <T = unknown, M = unknown>(
  method: THttpMethods,
  url: string,
  data: unknown,
  config?: AxiosRequestConfig,
  loadingTarget?: TLoadingTarget,
  toastMessage?: string,
): Promise<IFailureResponse | TSuccessResponse<T, M>> => {
  let loadingInstance: null | ReturnType<typeof ElLoading.service> = null;

  try {
    loadingInstance = showLoading(loadingTarget || false);

    const response: AxiosResponse<TSuccessResponse<T, M>> = await httpService[method](
      url,
      data,
      config,
    );
    if (toastMessage) showToast(toastMessage);

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
    if (toastMessage) showToast(errorMessage, EToast.Error);

    throw {
      error: {
        code: errorCode,
        message: errorMessage,
      },
      status: EResponseStatus.Failure,
    } as IFailureResponse;
  } finally {
    hideLoading(loadingInstance);
  }
};

const http = {
  delete: async <T = unknown, M = unknown>(
    url: string,
    config?: AxiosRequestConfig,
    loadingTarget?: TLoadingTarget,
    toastMessage?: string,
  ) => {
    return await request<T, M>(DELETE, url, undefined, config, loadingTarget, toastMessage);
  },

  get: async <T = unknown, M = unknown>(
    url: string,
    config?: AxiosRequestConfig,
    loadingTarget?: TLoadingTarget,
    toastMessage?: string,
  ) => {
    return await request<T, M>(GET, url, undefined, config, loadingTarget, toastMessage);
  },

  handleUnauthorizedError: async (error: AxiosError) => {
    const authStore = useAuthStore();
    const isSuccess = await authStore.refreshToken();

    if (isSuccess) {
      const accessToken = useLocalStorage(ACCESS_TOKEN, '').value;
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
    return await request<T, M>(PATCH, url, data, config, loadingTarget, toastMessage);
  },

  post: async <T = unknown, M = unknown>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
    loadingTarget?: TLoadingTarget,
    toastMessage?: string,
  ) => {
    return await request<T, M>(POST, url, data, config, loadingTarget, toastMessage);
  },

  put: async <T = unknown, M = unknown>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
    loadingTarget?: TLoadingTarget,
    toastMessage?: string,
  ) => {
    return await request<T, M>(PUT, url, data, config, loadingTarget, toastMessage);
  },
};

export default http;
