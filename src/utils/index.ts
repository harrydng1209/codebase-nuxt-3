import http from './http.util';
import shared from './shared.util';

interface IUtils {
  http: typeof http;
  shared: typeof shared;
}

const utils: IUtils = {
  http,
  shared
};

export default utils;
