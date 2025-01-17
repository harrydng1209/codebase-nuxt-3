export type TDate = Date | number | string;

export type TLoadingTarget =
  | 'fullscreen'
  | (typeof constants.shared.SELECTORS)[keyof typeof constants.shared.SELECTORS]
  | false;

export type TObjectBoolean = Record<string, boolean>;
export type TObjectString = Record<string, string>;
export type TObjectUnknown = Record<string, unknown>;

export type TOptions<T = boolean | number | string | TObjectUnknown> = {
  id?: number;
  label: string;
  value: T;
};
