import axios from 'axios';
import qs from 'qs';
import { useLocalStorage } from '@vueuse/core';

const httpService = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  paramsSerializer: (params) => qs.stringify(params, { indices: true })
});

httpService.interceptors.request.use(
  (config) => {
    const token = useLocalStorage(constants.shared.LOCAL_STORAGE_KEYS.ACCESS_TOKEN, '');

    if (config.data && !(config.data instanceof FormData))
      config.data = utils.shared.convertToSnakeCase(config.data);
    if (config.params) config.params = utils.shared.convertToSnakeCase(config.params);
    if (token.value) config.headers.Authorization = `Bearer ${token.value}`;
    return config;
  },
  (error) => Promise.reject(error)
);

httpService.interceptors.response.use(
  (response) => {
    if (response.data) response.data = utils.shared.convertToCamelCase(response.data);
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const errorData = error.response?.data || {};

    if (!status) throw new Error(errorData.message || 'An unknown error occurred');

    switch (status) {
      case constants.shared.HTTP_RESPONSE_STATUS_CODES.BAD_REQUEST:
        throw new Error(errorData.message || 'The request was invalid');

      case constants.shared.HTTP_RESPONSE_STATUS_CODES.UNAUTHORIZED:
        throw new Error(errorData.message || 'Authentication is required');

      case constants.shared.HTTP_RESPONSE_STATUS_CODES.FORBIDDEN:
        throw new Error(errorData.message || 'You do not have permission to access this resource');

      case constants.shared.HTTP_RESPONSE_STATUS_CODES.NOT_FOUND:
        throw new Error(errorData.message || 'The requested resource was not found');

      default:
        throw new Error(errorData.message || 'An unexpected error occurred');
    }
  }
);

export default httpService;
