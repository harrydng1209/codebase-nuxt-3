import type { TObjectUnknown } from '@/models/types/shared.type';

import { EStatusCode } from '@/models/enums/auth.enum';

import { COOKIE_KEYS } from '~/constants/shared.const';
import { handleUnauthorizedError } from '~/utils/api.util';
import { convertToCamelCase, convertToSnakeCase } from '~/utils/shared.util';

export const apiConfig = $fetch.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },

  onRequest: ({ options }) => {
    const accessToken = useCookie(COOKIE_KEYS.ACCESS_TOKEN, {
      maxAge: 60 * 60 * 24,
      path: '/',
      sameSite: 'lax',
    });

    if (options.body && !(options.body instanceof FormData))
      options.body = convertToSnakeCase(
        options.body as TObjectUnknown | TObjectUnknown[],
      );
    if (options.params) options.params = convertToSnakeCase(options.params);
    if (accessToken.value)
      options.headers.set('Authorization', `Bearer ${accessToken.value}`);
  },
  onRequestError: ({ error }) => Promise.reject(error),

  onResponse: ({ response }) => {
    if (response._data) response._data = convertToCamelCase(response._data);
  },
  onResponseError: ({ options, response }) => {
    const statusCode = response.status;

    if (statusCode === EStatusCode.Unauthorized)
      handleUnauthorizedError(options, response);

    return Promise.reject(response);
  },
});
