import type { EHttpStatusCode, EResponseStatus } from '../enums/auth.enum';

export type TActions =
  | 'create'
  | 'delete'
  | 'manage'
  | 'moderate'
  | 'read'
  | 'update';

export type TErrorCodes =
  (typeof constants.shared.ERROR_CODES)[keyof typeof constants.shared.ERROR_CODES];

export type TFailureResponse<D = unknown> = {
  error: {
    code: TErrorCodes;
    data: D;
    message: string;
  };
  status: EResponseStatus;
  statusCode: EHttpStatusCode;
};

export type TSubjects = 'all' | 'Article' | 'Comment' | 'User';

export type TSuccessResponse<D = unknown, M = unknown> = {
  data: D;
  meta: M;
  status: EResponseStatus;
  statusCode: EHttpStatusCode;
};
