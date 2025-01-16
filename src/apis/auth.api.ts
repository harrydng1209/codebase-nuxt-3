import type { ILoginResponse, IUserInfo } from '@/models/interfaces/auth.interface';

const { AUTH } = constants.routeApis;
const { get, post } = utils.http;

const auth = {
  login: async (data: unknown) => {
    const url = AUTH.LOGIN;
    return await post<ILoginResponse>(url, data, { withCredentials: true });
  },

  profile: async () => {
    const url = AUTH.PROFILE;
    return await get<IUserInfo>(url);
  },

  refreshToken: async () => {
    const url = AUTH.REFRESH_TOKEN;
    return await post<ILoginResponse>(url, null, {
      withCredentials: true,
    });
  },
};

export default auth;
