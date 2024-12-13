import { EDataType, EResponseStatus } from '@/models/enums/shared.enum';
import type { TLoadingTarget, TSuccessResponse } from '@/models/types/shared.type';
import qs from 'qs';
import storeService from '@/services/store.service';
import { EToast } from '@/models/enums/shared.enum';
import { ElNotification, ElLoading } from 'element-plus';
import { capitalize } from 'lodash-es';
import type { IFailureResponse } from '@/models/interfaces/shared.interface';
import stringFormat from 'string-template';

const shared = {
  isSuccessResponse<T, M>(
    response: TSuccessResponse<T, M> | IFailureResponse
  ): response is TSuccessResponse<T, M> {
    return response.status === EResponseStatus.Success;
  },
  stringFormat: (template: string, values: Record<string, unknown> | unknown[]): string => {
    return stringFormat(template, values);
  },
  showToast: (message: string, type: EToast = EToast.Success, title: string = capitalize(type)) => {
    ElNotification({
      message,
      type,
      title,
      duration: 3000
    });
  },
  showLoading: (target: TLoadingTarget) => {
    if (target === false) return null;

    if (target === 'full-screen')
      return ElLoading.service({ lock: true, text: 'Loading', background: 'rgba(0, 0, 0, 0.7)' });

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
  hideLoading: (loadingInstance: ReturnType<typeof ElLoading.service> | null) => {
    if (loadingInstance) {
      loadingInstance.close();
      const element = loadingInstance.target.value;
      if (element && element instanceof HTMLElement)
        element.classList.remove('tw-pointer-events-none');
    }
  },
  storeDisposeAll: () => {
    storeService.disposeAll();
  },
  storeResetAll: () => {
    storeService.resetAll();
  },
  sleep: (second: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000 * second);
    });
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
  formatQueryString: (
    baseUrl: string,
    query: string | string[] | Record<string, unknown>
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
  cleanQuery: <T>(query: Record<string, unknown>): T => {
    const cleanedQuery = Object.fromEntries(
      Object.entries(query).filter(([_, value]) => value !== undefined && value !== '')
    );

    return cleanedQuery as T;
  }
};

export default shared;
