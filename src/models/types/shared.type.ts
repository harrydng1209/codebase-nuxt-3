import type { SELECTORS } from '~/constants/shared.const';

export type TDate = Date | number | string;

export type TLoadingTargets =
  | 'fullscreen'
  | (typeof SELECTORS)[keyof typeof SELECTORS];

export type TObjectBoolean = Record<string, boolean>;
export type TObjectString = Record<string, string>;
export type TObjectUnknown = Record<string, unknown>;

export type TOptions<V = boolean | number | string | TObjectUnknown> = {
  id?: number | string;
  label: string;
  value: V;
};
