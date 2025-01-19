import type {
  TFailureResponse,
  TSuccessResponse,
} from '@/models/types/auth.type';
import type { TLoadingTargets } from '@/models/types/shared.type';
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import type { FetchResponse, ResolvedFetchOptions } from 'ofetch';

import { EResponseStatus } from '@/models/enums/auth.enum';
import httpService from '@/services/http.service';
import useAuthStore from '@/stores/auth.store';

const { ACCESS_TOKEN } = constants.shared.STORAGE_KEYS;
const { ERR_500 } = constants.shared.ERROR_CODES;
const { AUTH } = constants.routePages;

type THttpConfig = NitroFetchOptions<NitroFetchRequest, THttpMethods>;
type THttpMethods = 'delete' | 'get' | 'patch' | 'post' | 'put';

const request = async <D = unknown, M = unknown>(
  method: THttpMethods,
  url: string,
  data: unknown,
  config?: THttpConfig,
  loadingTarget?: TLoadingTargets,
  toastMessage?: string,
) => {
  let loadingInstance: null | ReturnType<typeof ElLoading.service> = null;

  try {
    loadingInstance = utils.shared.showLoading(loadingTarget || false);
    const body =
      typeof data === 'object' && data !== null ? data : JSON.stringify(data);

    const response = await httpService.raw<TSuccessResponse<D, M>>(url, {
      body,
      method,
      ...config,
    });
    if (toastMessage) utils.shared.showToast(toastMessage);

    const result: TSuccessResponse<D, M> = {
      data: response._data!.data,
      meta: response._data!.meta,
      status: EResponseStatus.Success,
      statusCode: response.status,
    };
    return result;
  } catch (error) {
    const errorResponse = error as FetchResponse<TFailureResponse>;
    let errorCode = ERR_500;
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
    utils.shared.hideLoading(loadingInstance);
  }
};

const http = {
  delete: async <D = unknown, M = unknown>(
    url: string,
    config?: THttpConfig,
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
  },

  get: async <D = unknown, M = unknown>(
    url: string,
    config?: THttpConfig,
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
  },

  handleUnauthorizedError: async (
    options: ResolvedFetchOptions,
    response: FetchResponse<TFailureResponse>,
  ) => {
    if (options.retry && options.retry >= 1) return;

    const authStore = useAuthStore();
    const isTokenRefreshed = await authStore.refreshToken();

    if (!isTokenRefreshed) {
      authStore.logout();
      window.location.href = AUTH.LOGIN;
      return;
    }

    const accessToken = useCookie(ACCESS_TOKEN);
    const retryRequest: THttpConfig = {
      body: options.body,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken.value}`,
      },
      method: options.method as THttpMethods,
      retry: (options.retry || 0) + 1,
    };

    await httpService(response.url, retryRequest);
  },

  patch: async <D = unknown, M = unknown>(
    url: string,
    data: unknown,
    config?: THttpConfig,
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
  },

  post: async <D = unknown, M = unknown>(
    url: string,
    data: unknown,
    config?: THttpConfig,
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
  },

  put: async <D = unknown, M = unknown>(
    url: string,
    data: unknown,
    config?: THttpConfig,
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
  },
};

export default http;
