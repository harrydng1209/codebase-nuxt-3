import type { EResponseStatus } from '@/models/enums/shared.enum';

export type TDate = Date | number | string;

export type TLoadingTarget =
  | 'full-screen'
  | (typeof constants.shared.SELECTOR_IDS)[keyof typeof constants.shared.SELECTOR_IDS]
  | false;

export type TOptions<T = boolean | number | Record<string, unknown> | string> = {
  id?: number;
  label: string;
  value: T;
};

export type TSuccessResponse<T = unknown, M = unknown> = {
  data: T;
  meta: M;
  status: EResponseStatus;
};
