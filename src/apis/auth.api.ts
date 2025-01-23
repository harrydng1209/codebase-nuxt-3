import type {
  ILoginRequest,
  ILoginResponse,
  IRegister,
  IUserInfo,
} from '@/models/interfaces/auth.interface';

const { AUTH } = constants.routeApis;
const { SELECTORS } = constants.shared;
const { get, post } = utils.http;

const auth = {
  login: async (data: ILoginRequest) => {
    const url = AUTH.LOGIN;
    return await post<ILoginResponse>(
      url,
      data,
      { credentials: 'include' },
      SELECTORS.LOGIN_SECTION,
    );
  },

  profile: async () => {
    const url = AUTH.PROFILE;
    return await get<IUserInfo>(url);
  },

  refreshToken: async () => {
    const url = AUTH.REFRESH_TOKEN;
    return await post<ILoginResponse>(url, undefined, {
      credentials: 'include',
    });
  },

  register: async (data: IRegister) => {
    const url = AUTH.REGISTER;
    return await post<unknown>(
      url,
      data,
      undefined,
      SELECTORS.REGISTER_SECTION,
      'Registration successful',
    );
  },
};

export default auth;
