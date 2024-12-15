import type { EResponseStatus } from '@/models/enums/shared.enum';

export interface IFailureResponse {
  status: EResponseStatus;
  error: {
    message: string;
    code: number;
  };
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
