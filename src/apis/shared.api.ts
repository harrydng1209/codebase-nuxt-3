const shared = {
  healthCheck: async () => {
    // const url = utils.shared.queryStringFormat(constants.routeApis.HEALTH_CHECK, 'date=2024-08-21');
    // const url = utils.shared.stringFormat(constants.routeApis.HEALTH_CHECK, { id: companyId })
    const url = constants.routeApis.HEALTH_CHECK;
    return await utils.http.get<unknown>(
      url,
      undefined,
      constants.shared.SELECTOR_IDS.TEST_BUTTON_ID,
      'All systems are go! Health check successful'
    );
  }
};

export default shared;
