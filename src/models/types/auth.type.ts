import type { EResponseStatus } from '../enums/auth.enum';

export type TActions = 'create' | 'delete' | 'manage' | 'moderate' | 'read' | 'update';

export type TErrorCodes =
  (typeof constants.shared.ERROR_CODES)[keyof typeof constants.shared.ERROR_CODES];

export type TSubjects = 'all' | 'Article' | 'Comment' | 'User';

export type TSuccessResponse<T = unknown, M = unknown> = {
  data: T;
  meta: M;
  status: EResponseStatus;
};
