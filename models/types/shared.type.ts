import type { EResponseStatus } from '@/models/enums/shared.enum';

export type TDate = string | number | Date;

export type TLoadingTarget =
  | false
  | 'full-screen'
  | (typeof constants.shared.SELECTOR_IDS)[keyof typeof constants.shared.SELECTOR_IDS];

export type TSuccessResponse<T = unknown, M = unknown> = {
  status: EResponseStatus;
  data: T;
  meta: M;
};

export type TOptions<T = unknown> = {
  label: string;
  value: T;
};
