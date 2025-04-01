import type {
  ILoginRequest,
  ILoginResponse,
  IRegister,
  IUserInfo,
} from '@/models/interfaces/auth.interface';

import { AUTH_APIS } from '~/constants/route-apis.const';
import { SELECTORS } from '~/constants/shared.const';
import { get, post } from '~/utils/api.util';

export const login = async (data: ILoginRequest) => {
  const url = AUTH_APIS.LOGIN;
  return await post<ILoginResponse>(
    url,
    data,
    { credentials: 'include' },
    SELECTORS.LOGIN_SECTION,
  );
};

export const profile = async () => {
  const url = AUTH_APIS.PROFILE;
  return await get<IUserInfo>(url);
};

export const refreshToken = async () => {
  const url = AUTH_APIS.REFRESH_TOKEN;
  return await post<ILoginResponse>(url, undefined, {
    credentials: 'include',
  });
};

export const register = async (data: IRegister) => {
  const url = AUTH_APIS.REGISTER;
  return await post<unknown>(
    url,
    data,
    undefined,
    SELECTORS.REGISTER_SECTION,
    'Registration successful',
  );
};
