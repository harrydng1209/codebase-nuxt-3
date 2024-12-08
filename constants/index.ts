import shared from './shared.const';
import routePages from './route-pages.const';
import routeApis from './route-apis.const';

interface IConstants {
  shared: typeof shared;
  routePages: typeof routePages;
  routeApis: typeof routeApis;
}

const constants: IConstants = {
  shared,
  routePages,
  routeApis
};

export default constants;
