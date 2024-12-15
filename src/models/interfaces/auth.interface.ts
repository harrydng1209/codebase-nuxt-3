import type { ERole } from '../enums/auth.enum';

export interface ILoginResponse {
  accessToken: string;
}

export interface IUserInfo {
  id: number;
  role: ERole;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
