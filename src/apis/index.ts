import auth from './auth.api';
import shared from './shared.api';

interface IApis {
  auth: typeof auth;
  shared: typeof shared;
}

const apis: IApis = {
  auth,
  shared,
};

export default apis;
