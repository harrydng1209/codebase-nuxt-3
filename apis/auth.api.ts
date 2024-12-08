const auth = {
  login: async (data: unknown) => {
    const url = constants.routeApis.AUTH.LOGIN;
    return await utils.http.post<unknown>(url, data, { withCredentials: true });
  },
  refreshToken: async () => {
    const url = constants.routeApis.AUTH.REFRESH_TOKEN;
    return await utils.http.post<unknown>(url, null, {
      withCredentials: true
    });
  },
  me: async () => {
    const url = constants.routeApis.AUTH.ME;
    return await utils.http.get<unknown>(url);
  }
};

export default auth;
