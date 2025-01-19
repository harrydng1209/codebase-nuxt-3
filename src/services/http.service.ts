import type { TObjectUnknown } from '@/models/types/shared.type';

import { EHttpStatusCode } from '@/models/enums/auth.enum';

const { ACCESS_TOKEN } = constants.shared.STORAGE_KEYS;

const httpService = $fetch.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  onRequest({ options }) {
    const accessToken = useCookie(ACCESS_TOKEN);

    if (options.body && !(options.body instanceof FormData))
      options.body = utils.shared.convertToSnakeCase(
        options.body as TObjectUnknown | TObjectUnknown[],
      );
    if (options.params)
      options.params = utils.shared.convertToSnakeCase(options.params);
    if (accessToken.value)
      options.headers.set('Authorization', `Bearer ${accessToken.value}`);
  },
  onRequestError({ error }) {
    return Promise.reject(error);
  },
  onResponse({ response }) {
    if (response._data)
      response._data = utils.shared.convertToCamelCase(response._data);
  },
  onResponseError({ options, response }) {
    const status = response.status;

    if (status === EHttpStatusCode.Unauthorized)
      utils.http.handleUnauthorizedError(options, response);

    return Promise.reject(response);
  },
});

export default httpService;
