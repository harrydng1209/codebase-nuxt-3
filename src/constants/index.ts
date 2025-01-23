import iconPaths from './icon-paths.const';
import routeApis from './route-apis.const';
import routePages from './route-pages.const';
import shared from './shared.const';
import themeColors from './theme-colors.const';

interface IConstants {
  iconPaths: typeof iconPaths;
  routeApis: typeof routeApis;
  routePages: typeof routePages;
  shared: typeof shared;
  themeColors: typeof themeColors;
}

const constants: IConstants = {
  iconPaths,
  routeApis,
  routePages,
  shared,
  themeColors,
};

export default constants;
