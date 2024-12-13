import type { EResponseStatus, ERole } from '@/models/enums/shared.enum';

export interface IFailureResponse {
  status: EResponseStatus;
  error: {
    message: string;
    code: number;
  };
}

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

export interface IBreadcrumbItem {
  text: string;
  to: {
    path?: string;
    name?: string;
    query?: Record<string, unknown>;
    params?: Record<string, unknown>;
  };
}
