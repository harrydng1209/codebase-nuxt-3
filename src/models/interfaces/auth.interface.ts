import type { ERole } from '../enums/auth.enum';

export interface ILoginResponse {
  accessToken: string;
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
