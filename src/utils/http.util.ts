import type { IFailureResponse } from '@/models/interfaces/shared.interface';
import type { TLoadingTarget, TSuccessResponse } from '@/models/types/shared.type';

import { EResponseStatus, EToast } from '@/models/enums/shared.enum';
import httpService from '@/services/http.service';
import { type AxiosRequestConfig, type AxiosResponse, isAxiosError } from 'axios';

type TApiRequestMethod =
  (typeof constants.shared.API_REQUEST_METHODS)[keyof typeof constants.shared.API_REQUEST_METHODS];

const request = async <T = unknown, M = unknown>(
  method: TApiRequestMethod,
  url: string,
  data: unknown,
  config?: AxiosRequestConfig,
  loadingTarget?: TLoadingTarget,
  toastMessage?: string
): Promise<IFailureResponse | TSuccessResponse<T, M>> => {
  let loadingInstance: null | ReturnType<typeof ElLoading.service> = null;

  try {
    loadingInstance = utils.shared.showLoading(loadingTarget || false);

    const response: AxiosResponse<TSuccessResponse<T, M>> = await httpService[method](
      url,
      data,
      config
    );
    if (toastMessage) utils.shared.showToast(toastMessage);

    return {
      data: response.data.data,
      meta: response.data.meta,
      status: EResponseStatus.Success
    } as TSuccessResponse<T, M>;
  } catch (error: unknown) {
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
        message: errorMessage
      },
      status: EResponseStatus.Failure
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
    toastMessage?: string
  ) => {
    return await request<T, M>(
      constants.shared.API_REQUEST_METHODS.DELETE,
      url,
      undefined,
      config,
      loadingTarget,
      toastMessage
    );
  },
  get: async <T = unknown, M = unknown>(
    url: string,
    config?: AxiosRequestConfig,
    loadingTarget?: TLoadingTarget,
    toastMessage?: string
  ) => {
    return await request<T, M>(
      constants.shared.API_REQUEST_METHODS.GET,
      url,
      undefined,
      config,
      loadingTarget,
      toastMessage
    );
  },
  patch: async <T = unknown, M = unknown>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
    loadingTarget?: TLoadingTarget,
    toastMessage?: string
  ) => {
    return await request<T, M>(
      constants.shared.API_REQUEST_METHODS.PATCH,
      url,
      data,
      config,
      loadingTarget,
      toastMessage
    );
  },
  post: async <T = unknown, M = unknown>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
    loadingTarget?: TLoadingTarget,
    toastMessage?: string
  ) => {
    return await request<T, M>(
      constants.shared.API_REQUEST_METHODS.POST,
      url,
      data,
      config,
      loadingTarget,
      toastMessage
    );
  },
  put: async <T = unknown, M = unknown>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
    loadingTarget?: TLoadingTarget,
    toastMessage?: string
  ) => {
    return await request<T, M>(
      constants.shared.API_REQUEST_METHODS.PUT,
      url,
      data,
      config,
      loadingTarget,
      toastMessage
    );
  }
};

export default http;
