import type { EResponseStatus, ERole } from '../enums/auth.enum';
import type { TActions, TErrorCodes, TSubjects } from '../types/auth.type';

export interface IFailureResponse {
  error: {
    code: TErrorCodes;
    message: string;
  };
  status: EResponseStatus;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
}

export interface IPermission {
  action: TActions;
  subject: TSubjects;
}

export interface IRegister {
  displayName: string;
  email: string;
  password: string;
  username: string;
}

export interface IUserInfo {
  createdAt: string;
  deletedAt: null | string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  role: ERole;
  updatedAt: string;
}
