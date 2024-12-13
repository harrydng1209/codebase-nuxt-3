import http from './http.util';
import shared from './shared.util';

interface IUtils {
  shared: typeof shared;
  http: typeof http;
}

const utils: IUtils = {
  shared,
  http
};

export default utils;
