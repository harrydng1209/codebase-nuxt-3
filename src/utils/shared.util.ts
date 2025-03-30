import type { TFailureResponse } from '@/models/types/auth.type';
import type {
  TDate,
  TLoadingTargets,
  TObjectUnknown,
} from '@/models/types/shared.type';

import { EResponseStatus } from '@/models/enums/auth.enum';
import { EToast } from '@/models/enums/shared.enum';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { capitalize } from 'lodash-es';
import { getActivePinia, type Pinia, type Store } from 'pinia';
import { stringify } from 'qs';
import stringTemplate from 'string-template';

interface IPinia extends Pinia {
  storeMap: Map<string, Store>;
}

dayjs.extend(utc);

export const cleanQuery = <T>(query: TObjectUnknown): T => {
  const cleanedQuery = Object.fromEntries(
    Object.entries(query).filter(
      ([_, value]) => value !== undefined && value !== '',
    ),
  );
  return cleanedQuery as T;
};

export const convertToCamelCase = <T>(
  data: TObjectUnknown | TObjectUnknown[],
): T => {
  if (Array.isArray(data))
    return data.map((item) => convertToCamelCase(item)) as T;
  if (data === null || typeof data !== 'object') return data as T;

  const newObject: TObjectUnknown = {};
  Object.keys(data).forEach((key) => {
    const newKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    const value = data[key];

    if (typeof value === 'object' && value !== null) {
      if (
        (value as TObjectUnknown).constructor === Object ||
        Array.isArray(value)
      ) {
        newObject[newKey] = convertToCamelCase(value as TObjectUnknown);
        return;
      }
    }
    newObject[newKey] = value;
  });
  return newObject as T;
};

export const convertToSnakeCase = <T>(
  data: TObjectUnknown | TObjectUnknown[],
): T => {
  if (Array.isArray(data))
    return data.map((item) => convertToSnakeCase(item)) as T;
  if (!data || typeof data !== 'object') return data as T;

  const newObject: TObjectUnknown = {};
  Object.keys(data).forEach((key) => {
    const newKey = key.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
    const value = data[key];

    if (typeof value === 'object' && value !== null) {
      newObject[newKey] = convertToSnakeCase(value as TObjectUnknown);
      return;
    }
    newObject[newKey] = value;
  });
  return newObject as T;
};

export const formatDateUTC = (date: TDate) => {
  return dayjs(date).utc().toISOString();
};

export const formatQueryString = (
  baseUrl: string,
  query: string | string[] | TObjectUnknown,
): string => {
  if (
    !query ||
    (Array.isArray(query) && query.length === 0) ||
    (typeof query === 'object' && Object.keys(query).length === 0)
  )
    return baseUrl;

  const queryString =
    typeof query === 'string'
      ? query
      : stringify(query, { arrayFormat: 'brackets' });
  return `${baseUrl}?${queryString}`;
};

export const formatString = (
  template: string,
  values: TObjectUnknown | unknown[],
): string => {
  return stringTemplate(template, values);
};

export const hideLoading = (
  loadingInstance: null | ReturnType<typeof ElLoading.service>,
) => {
  if (loadingInstance) {
    loadingInstance.close();
    const element = loadingInstance.target.value;
    if (element && element instanceof HTMLElement)
      element.classList.remove('tw-pointer-events-none');
  }
};

export const isFailureResponse = (
  response: Error | TFailureResponse,
): response is TFailureResponse => {
  return (
    typeof response === 'object' &&
    response !== null &&
    'status' in response &&
    response.status === EResponseStatus.Failure
  );
};

export const showLoading = (target: TLoadingTargets) => {
  if (target === 'fullscreen')
    return ElLoading.service({
      background: 'rgba(0, 0, 0, 0.4)',
      lock: true,
      text: 'Loading',
    });

  const element = document.getElementById(target);
  if (element) {
    element.classList.add('tw-pointer-events-none');
    return ElLoading.service({
      background: 'rgba(0, 0, 0, 0.1)',
      lock: true,
      target: element as HTMLElement,
      text: 'Loading',
    });
  }
  return null;
};

export const showToast = (
  message: string,
  type: EToast = EToast.Success,
  title: string = capitalize(type),
) => {
  ElNotification({
    duration: 3000,
    message,
    title,
    type,
  });
};

export const sleep = (second: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000 * second);
  });
};

export const disposeAll = () => {
  try {
    const pinia = getActivePinia() as IPinia;
    if (!pinia) throw new Error('There is no active Pinia instance');
    pinia.storeMap.forEach((store) => store.$dispose());
  } catch (error) {
    console.error(error);
  }
};

export const resetAll = () => {
  try {
    const pinia = getActivePinia() as IPinia;
    if (!pinia) throw new Error('There is no active Pinia instance');
    pinia.storeMap.forEach((store) => store.$reset());
  } catch (error) {
    console.error(error);
  }
};
