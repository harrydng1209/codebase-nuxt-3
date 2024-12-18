import type { ERole } from '../enums/auth.enum';
import type { Actions, Subjects } from '../types/auth.type';

export interface ILoginResponse {
  accessToken: string;
}

export interface IPermission {
  action: Actions;
  subject: Subjects;
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
