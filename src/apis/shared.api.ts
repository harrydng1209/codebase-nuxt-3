const { HEALTH_CHECK } = constants.routeApis;

const shared = {
  healthCheck: async () => {
    // const url = utils.shared.formatQueryString(HEALTH_CHECK, 'date=2024-08-21');
    // const url = utils.shared.formatString(HEALTH_CHECK, { id: companyId })
    const url = HEALTH_CHECK;
    return await utils.http.get<unknown>(
      url,
      undefined,
      constants.shared.SELECTOR_IDS.APIS_SECTION_ID,
      'All systems are go! Health check successful'
    );
  }
};

export default shared;
