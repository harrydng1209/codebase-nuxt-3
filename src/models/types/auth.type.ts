import type { ERROR_CODES } from '~/constants/shared.const';

import type { EResponseStatus, EStatusCode } from '../enums/auth.enum';

export type TActions =
  | 'create'
  | 'delete'
  | 'manage'
  | 'moderate'
  | 'read'
  | 'update';

export type TErrorCodes = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export type TFailureResponse<D = unknown> = {
  error: {
    code: TErrorCodes;
    data: D;
    message: string;
  };
  status: EResponseStatus;
  statusCode: EStatusCode;
};

export type TSubjects = 'all' | 'Article' | 'Comment' | 'User';

export type TSuccessResponse<D = unknown, M = unknown> = {
  data: D;
  meta: M;
  status: EResponseStatus;
  statusCode: EStatusCode;
};
