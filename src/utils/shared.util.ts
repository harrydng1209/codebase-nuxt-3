import type { IFailureResponse } from '@/models/interfaces/shared.interface';
import type { TLoadingTarget, TSuccessResponse } from '@/models/types/shared.type';

import { EDataType, EResponseStatus } from '@/models/enums/shared.enum';
import { EToast } from '@/models/enums/shared.enum';
import storeService from '@/services/store.service';
import { capitalize } from 'lodash-es';
import qs from 'qs';
import stringFormat from 'string-template';

const shared = {
  convertToCamelCase: <T>(data: Record<string, unknown> | Record<string, unknown>[]): T => {
    if (Array.isArray(data)) return data.map((item) => shared.convertToCamelCase(item)) as T;
    if (data === null || typeof data !== EDataType.Object) return data as T;

    const newObject: Record<string, unknown> = {};
    Object.keys(data).forEach((key) => {
      const newKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      const value = data[key];

      if (typeof value === EDataType.Object && value !== null) {
        if ((value as Record<string, unknown>).constructor === Object || Array.isArray(value)) {
          newObject[newKey] = shared.convertToCamelCase(value as Record<string, unknown>);
          return;
        }
      }
      newObject[newKey] = value;
    });
    return newObject as T;
  },
  convertToSnakeCase: <T>(data: Record<string, unknown> | Record<string, unknown>[]): T => {
    if (Array.isArray(data)) return data.map((item) => shared.convertToSnakeCase(item)) as T;
    if (!data || typeof data !== EDataType.Object) return data as T;

    const newObject: Record<string, unknown> = {};
    Object.keys(data).forEach((key) => {
      const newKey = key.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
      const value = data[key];

      if (typeof value === EDataType.Object && value !== null) {
        newObject[newKey] = shared.convertToSnakeCase(value as Record<string, unknown>);
        return;
      }
      newObject[newKey] = value;
    });
    return newObject as T;
  },
  hideLoading: (loadingInstance: null | ReturnType<typeof ElLoading.service>) => {
    if (loadingInstance) {
      loadingInstance.close();
      const element = loadingInstance.target.value;
      if (element && element instanceof HTMLElement)
        element.classList.remove('tw-pointer-events-none');
    }
  },
  isSuccessResponse<T, M>(
    response: IFailureResponse | TSuccessResponse<T, M>
  ): response is TSuccessResponse<T, M> {
    return response.status === EResponseStatus.Success;
  },
  queryClean: <T>(query: Record<string, unknown>): T => {
    const cleanedQuery = Object.fromEntries(
      Object.entries(query).filter(([_, value]) => value !== undefined && value !== '')
    );

    return cleanedQuery as T;
  },
  queryStringFormat: (
    baseUrl: string,
    query: Record<string, unknown> | string | string[]
  ): string => {
    if (
      !query ||
      (Array.isArray(query) && query.length === 0) ||
      (typeof query === EDataType.Object && Object.keys(query).length === 0)
    )
      return baseUrl;

    const queryString =
      typeof query === EDataType.String ? query : qs.stringify(query, { arrayFormat: 'brackets' });
    return `${baseUrl}?${queryString}`;
  },
  showLoading: (target: TLoadingTarget) => {
    if (target === false) return null;

    if (target === 'full-screen')
      return ElLoading.service({ background: 'rgba(0, 0, 0, 0.7)', lock: true, text: 'Loading' });

    const element = document.getElementById(target);
    if (element) {
      element.classList.add('tw-pointer-events-none');
      return ElLoading.service({
        lock: true,
        target: element as HTMLElement
      });
    }

    return null;
  },
  showToast: (message: string, type: EToast = EToast.Success, title: string = capitalize(type)) => {
    ElNotification({
      duration: 3000,
      message,
      title,
      type
    });
  },
  sleep: (second: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000 * second);
    });
  },
  storeDisposeAll: () => {
    storeService.disposeAll();
  },
  storeResetAll: () => {
    storeService.resetAll();
  },
  stringFormat: (template: string, values: Record<string, unknown> | unknown[]): string => {
    return stringFormat(template, values);
  }
};

export default shared;
