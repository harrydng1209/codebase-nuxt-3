import type { RouteLocationRaw } from 'vue-router';

export interface IBreadcrumbItem {
  text: string;
  to: RouteLocationRaw;
}
