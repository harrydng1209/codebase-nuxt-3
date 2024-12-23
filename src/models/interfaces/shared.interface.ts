import type { EResponseStatus } from '@/models/enums/shared.enum';
import type { RouteLocationRaw } from 'vue-router';

export interface IBreadcrumbItem {
  text: string;
  to: RouteLocationRaw;
}

export interface IFailureResponse {
  error: {
    code: number;
    message: string;
  };
  status: EResponseStatus;
}
