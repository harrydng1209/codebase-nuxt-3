import shared from './shared.api';
import auth from './auth.api';

interface IApis {
  shared: typeof shared;
  auth: typeof auth;
}

const apis: IApis = {
  shared,
  auth
};

export default apis;
