import type { ILoginResponse, IUserInfo } from '~/models/interfaces/auth.interface';

const auth = {
  login: async (data: unknown) => {
    const url = constants.routeApis.AUTH.LOGIN;
    return await utils.http.post<ILoginResponse>(url, data, { withCredentials: true });
  },
  refreshToken: async () => {
    const url = constants.routeApis.AUTH.REFRESH_TOKEN;
    return await utils.http.post<ILoginResponse>(url, null, {
      withCredentials: true
    });
  },
  me: async () => {
    const url = constants.routeApis.AUTH.ME;
    return await utils.http.get<IUserInfo>(url);
  }
};

export default auth;
