import type { IFailureResponse } from '@/models/interfaces/shared.interface';
import type {
  TDate,
  TLoadingTarget,
  TObjectUnknown,
  TSuccessResponse,
} from '@/models/types/shared.type';

import { EResponseStatus, EToast } from '@/models/enums/shared.enum';
import storeService from '@/services/store.service';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { capitalize } from 'lodash-es';
import qs from 'qs';
import stringTemplate from 'string-template';

dayjs.extend(utc);

const shared = {
  cleanQuery: <T>(query: TObjectUnknown): T => {
    const cleanedQuery = Object.fromEntries(
      Object.entries(query).filter(([_, value]) => value !== undefined && value !== ''),
    );
    return cleanedQuery as T;
  },

  convertToCamelCase: <T>(data: TObjectUnknown | TObjectUnknown[]): T => {
    if (Array.isArray(data)) return data.map((item) => shared.convertToCamelCase(item)) as T;
    if (data === null || typeof data !== 'object') return data as T;

    const newObject: TObjectUnknown = {};
    Object.keys(data).forEach((key) => {
      const newKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      const value = data[key];

      if (typeof value === 'object' && value !== null) {
        if ((value as TObjectUnknown).constructor === Object || Array.isArray(value)) {
          newObject[newKey] = shared.convertToCamelCase(value as TObjectUnknown);
          return;
        }
      }
      newObject[newKey] = value;
    });
    return newObject as T;
  },

  convertToSnakeCase: <T>(data: TObjectUnknown | TObjectUnknown[]): T => {
    if (Array.isArray(data)) return data.map((item) => shared.convertToSnakeCase(item)) as T;
    if (!data || typeof data !== 'object') return data as T;

    const newObject: TObjectUnknown = {};
    Object.keys(data).forEach((key) => {
      const newKey = key.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
      const value = data[key];

      if (typeof value === 'object' && value !== null) {
        newObject[newKey] = shared.convertToSnakeCase(value as TObjectUnknown);
        return;
      }
      newObject[newKey] = value;
    });
    return newObject as T;
  },

  formatDateUTC: (date: TDate) => {
    return dayjs(date).utc().toISOString();
  },

  formatQueryString: (baseUrl: string, query: string | string[] | TObjectUnknown): string => {
    if (
      !query ||
      (Array.isArray(query) && query.length === 0) ||
      (typeof query === 'object' && Object.keys(query).length === 0)
    )
      return baseUrl;

    const queryString =
      typeof query === 'string' ? query : qs.stringify(query, { arrayFormat: 'brackets' });
    return `${baseUrl}?${queryString}`;
  },

  formatString: (template: string, values: TObjectUnknown | unknown[]): string => {
    return stringTemplate(template, values);
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
    response: IFailureResponse | TSuccessResponse<T, M>,
  ): response is TSuccessResponse<T, M> {
    return response.status === EResponseStatus.Success;
  },

  showLoading: (target: TLoadingTarget) => {
    if (target === false) return null;

    if (target === 'fullscreen')
      return ElLoading.service({ background: 'rgba(0, 0, 0, 0.7)', lock: true, text: 'Loading' });

    const element = document.getElementById(target);
    if (element) {
      element.classList.add('tw-pointer-events-none');
      return ElLoading.service({
        lock: true,
        target: element as HTMLElement,
      });
    }
    return null;
  },

  showToast: (message: string, type: EToast = EToast.Success, title: string = capitalize(type)) => {
    ElNotification({
      duration: 3000,
      message,
      title,
      type,
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
};

export default shared;
