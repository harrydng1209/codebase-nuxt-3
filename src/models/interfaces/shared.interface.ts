import type { EResponseStatus } from '@/models/enums/shared.enum';

export interface IBreadcrumbItem {
  text: string;
  to: {
    name?: string;
    params?: Record<string, unknown>;
    path?: string;
    query?: Record<string, unknown>;
  };
}

export interface IFailureResponse {
  error: {
    code: number;
    message: string;
  };
  status: EResponseStatus;
}
