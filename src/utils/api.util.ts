import type {
  TFailureResponse,
  TSuccessResponse,
} from '@/models/types/auth.type';
import type { TLoadingTargets } from '@/models/types/shared.type';
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import type { FetchResponse, ResolvedFetchOptions } from 'ofetch';

import apiConfig from '@/configs/api.config';
import { EResponseStatus } from '@/models/enums/auth.enum';
import useAuthStore from '@/stores/auth.store';

import { AUTH_PAGES } from '~/constants/route-pages.const';
import { ERROR_CODES, STORAGE_KEYS } from '~/constants/shared.const';

import { hideLoading, showLoading, showToast } from './shared.util';

type TConfigs = NitroFetchOptions<NitroFetchRequest, TMethods>;
type TMethods = 'delete' | 'get' | 'patch' | 'post' | 'put';

const request = async <D = unknown, M = unknown>(
  method: TMethods,
  url: string,
  data: unknown,
  config?: TConfigs,
  loadingTarget?: TLoadingTargets,
  toastMessage?: string,
) => {
  let loadingInstance: null | ReturnType<typeof ElLoading.service> = null;

  try {
    const body =
      typeof data === 'object' && data !== null ? data : JSON.stringify(data);

    if (loadingTarget) loadingInstance = showLoading(loadingTarget);

    const response = await apiConfig.raw<TSuccessResponse<D, M>>(url, {
      body,
      method,
      ...config,
    });

    if (toastMessage) showToast(toastMessage);

    const result: TSuccessResponse<D, M> = {
      data: response._data!.data,
      meta: response._data!.meta,
      status: EResponseStatus.Success,
      statusCode: response.status,
    };
    return result;
  } catch (error) {
    const errorResponse = error as FetchResponse<TFailureResponse>;
    let errorCode = ERROR_CODES.ERR_500;
    let errorData = null;
    let errorMessage = 'An error occurred';
    let statusCode = 500;

    if (errorResponse) {
      errorCode = errorResponse._data?.error.code || errorCode;
      errorData = errorResponse._data?.error.data || errorData;
      errorMessage = errorResponse._data?.error.message || errorMessage;
      statusCode = errorResponse.status || statusCode;
    }

    const result: TFailureResponse = {
      error: {
        code: errorCode,
        data: errorData,
        message: errorMessage,
      },
      status: EResponseStatus.Failure,
      statusCode,
    };
    return Promise.reject(result);
  } finally {
    hideLoading(loadingInstance);
  }
};

export const del = async <D = unknown, M = unknown>(
  url: string,
  config?: TConfigs,
  loadingTarget?: TLoadingTargets,
  toastMessage?: string,
) => {
  return await request<D, M>(
    'delete',
    url,
    undefined,
    config,
    loadingTarget,
    toastMessage,
  );
};

export const get = async <D = unknown, M = unknown>(
  url: string,
  config?: TConfigs,
  loadingTarget?: TLoadingTargets,
  toastMessage?: string,
) => {
  return await request<D, M>(
    'get',
    url,
    undefined,
    config,
    loadingTarget,
    toastMessage,
  );
};

export const handleUnauthorizedError = async (
  options: ResolvedFetchOptions,
  response: FetchResponse<TFailureResponse>,
) => {
  if (options.retry && options.retry >= 1) return;

  const authStore = useAuthStore();
  const isTokenRefreshed = await authStore.refreshToken();

  if (!isTokenRefreshed) {
    authStore.logout();
    window.location.href = AUTH_PAGES.LOGIN;
    return;
  }

  const accessToken = useCookie(STORAGE_KEYS.ACCESS_TOKEN);
  const retryRequest: TConfigs = {
    body: options.body,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken.value}`,
    },
    method: options.method as TMethods,
    retry: (options.retry || 0) + 1,
  };

  await apiConfig(response.url, retryRequest);
};

export const patch = async <D = unknown, M = unknown>(
  url: string,
  data: unknown,
  config?: TConfigs,
  loadingTarget?: TLoadingTargets,
  toastMessage?: string,
) => {
  return await request<D, M>(
    'patch',
    url,
    data,
    config,
    loadingTarget,
    toastMessage,
  );
};

export const post = async <D = unknown, M = unknown>(
  url: string,
  data: unknown,
  config?: TConfigs,
  loadingTarget?: TLoadingTargets,
  toastMessage?: string,
) => {
  return await request<D, M>(
    'post',
    url,
    data,
    config,
    loadingTarget,
    toastMessage,
  );
};

export const put = async <D = unknown, M = unknown>(
  url: string,
  data: unknown,
  config?: TConfigs,
  loadingTarget?: TLoadingTargets,
  toastMessage?: string,
) => {
  return await request<D, M>(
    'put',
    url,
    data,
    config,
    loadingTarget,
    toastMessage,
  );
};
