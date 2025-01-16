import type { IFailureResponse } from '@/models/interfaces/shared.interface';

import { useLocalStorage } from '@vueuse/core';
import axios, { type AxiosError } from 'axios';
import qs from 'qs';

const { BAD_REQUEST, FORBIDDEN, NOT_FOUND, UNAUTHORIZED } = constants.shared.HTTP_CODES;
const { ACCESS_TOKEN } = constants.shared.STORAGE_KEYS;
const { convertToCamelCase, convertToSnakeCase } = utils.shared;
const { handleUnauthorizedError } = utils.http;

const httpService = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => qs.stringify(params, { indices: true }),
});

httpService.interceptors.request.use(
  (config) => {
    const accessToken = useLocalStorage(ACCESS_TOKEN, '');

    if (config.data && !(config.data instanceof FormData))
      config.data = convertToSnakeCase(config.data);
    if (config.params) config.params = convertToSnakeCase(config.params);
    if (accessToken.value) config.headers.Authorization = `Bearer ${accessToken.value}`;
    return config;
  },
  (error) => Promise.reject(error),
);

httpService.interceptors.response.use(
  (response) => {
    if (response.data) response.data = convertToCamelCase(response.data);
    return response;
  },
  (error: AxiosError) => {
    const status = error.response?.status;
    const errorData = error.response?.data as IFailureResponse;

    if (!status) throw new Error(errorData.error.message || 'An unknown error occurred');

    switch (status) {
      case BAD_REQUEST:
        throw new Error(errorData.error.message || 'The request was invalid');

      case UNAUTHORIZED:
        handleUnauthorizedError(error);
        throw new Error(errorData.error.message || 'Authentication failed after token refresh');

      case FORBIDDEN:
        throw new Error(
          errorData.error.message || 'You do not have permission to access this resource',
        );

      case NOT_FOUND:
        throw new Error(errorData.error.message || 'The requested resource was not found');

      default:
        throw new Error(errorData.error.message || 'An unexpected error occurred');
    }
  },
);

export default httpService;
