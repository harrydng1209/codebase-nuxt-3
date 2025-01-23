const { HEALTH_CHECK } = constants.routeApis;
const { SELECTORS } = constants.shared;
const { get } = utils.http;

const shared = {
  healthCheck: async () => {
    const url = HEALTH_CHECK;
    return await get<unknown>(
      url,
      undefined,
      SELECTORS.APIS_SECTION,
      'All systems are go! Health check successful',
    );
  },
};

export default shared;
