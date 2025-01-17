import type { IFailureResponse } from '@/models/interfaces/auth.interface';

import { useLocalStorage } from '@vueuse/core';
import axios, { type AxiosError } from 'axios';
import qs from 'qs';

const { UNAUTHORIZED } = constants.shared.HTTP_CODES;
const { ACCESS_TOKEN } = constants.shared.STORAGE_KEYS;

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
      config.data = utils.shared.convertToSnakeCase(config.data);
    if (config.params) config.params = utils.shared.convertToSnakeCase(config.params);
    if (accessToken.value) config.headers.Authorization = `Bearer ${accessToken.value}`;
    return config;
  },
  (error) => Promise.reject(error),
);

httpService.interceptors.response.use(
  (response) => {
    if (response.data) response.data = utils.shared.convertToCamelCase(response.data);
    return response;
  },
  (error: AxiosError<IFailureResponse>) => {
    const status = error.response?.status;

    switch (status) {
      case UNAUTHORIZED:
        utils.http.handleUnauthorizedError(error);
        throw error;

      default:
        throw error;
    }
  },
);

export default httpService;
