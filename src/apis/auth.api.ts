import type { ILoginResponse, IUserInfo } from '@/models/interfaces/auth.interface';

const { AUTH } = constants.routeApis;

const auth = {
  login: async (data: unknown) => {
    const url = AUTH.LOGIN;
    return await utils.http.post<ILoginResponse>(url, data, { withCredentials: true });
  },

  me: async () => {
    const url = AUTH.ME;
    return await utils.http.get<IUserInfo>(url);
  },

  refreshToken: async () => {
    const url = AUTH.REFRESH_TOKEN;
    return await utils.http.post<ILoginResponse>(url, null, {
      withCredentials: true,
    });
  },
};

export default auth;
