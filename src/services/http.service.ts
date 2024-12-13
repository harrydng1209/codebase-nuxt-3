import axios from 'axios';
import qs from 'qs';
import { useLocalStorage } from '@vueuse/core';

const httpService = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
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

    if (!status) {
      console.error('An unexpected error occurred:', error.message || 'An unknown error occurred.');
      return Promise.reject(error);
    }

    switch (status) {
      case constants.shared.HTTP_RESPONSE_STATUS_CODES.BAD_REQUEST:
        console.error('Bad Request:', errorData.message || 'The request was invalid.');
        break;

      case constants.shared.HTTP_RESPONSE_STATUS_CODES.UNAUTHORIZED:
        console.error('Unauthorized:', errorData.message || 'Authentication is required.');
        break;

      case constants.shared.HTTP_RESPONSE_STATUS_CODES.FORBIDDEN:
        console.error(
          'Forbidden:',
          errorData.message || 'You do not have permission to access this resource.'
        );
        break;

      case constants.shared.HTTP_RESPONSE_STATUS_CODES.NOT_FOUND:
        console.error('Not Found:', errorData.message || 'The requested resource was not found.');
        break;

      default:
        console.error('An error occurred:', errorData.message || 'An unexpected error occurred.');
    }
    return Promise.reject(error);
  }
);

export default httpService;
