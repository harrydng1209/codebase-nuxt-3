import shared from './shared.const';
import routePages from './route-pages.const';
import routeApis from './route-apis.const';
import iconPaths from './icon-paths.const';

interface IConstants {
  shared: typeof shared;
  routePages: typeof routePages;
  routeApis: typeof routeApis;
  iconPaths: typeof iconPaths;
}

const constants: IConstants = {
  shared,
  routePages,
  routeApis,
  iconPaths
};

export default constants;
