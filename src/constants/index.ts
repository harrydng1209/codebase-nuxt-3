import iconPaths from './icon-paths.const';
import routeApis from './route-apis.const';
import routePages from './route-pages.const';
import shared from './shared.const';

interface IConstants {
  iconPaths: typeof iconPaths;
  routeApis: typeof routeApis;
  routePages: typeof routePages;
  shared: typeof shared;
}

const constants: IConstants = {
  iconPaths,
  routeApis,
  routePages,
  shared,
};

export default constants;
