import LoginScreen from './screens/login/login';
import ErrorScreen from './screens/error/error';

export const routes = {
  login: {
    component: LoginScreen,
    guards: [],
  },
  error: {
    component: ErrorScreen,
    guards: [],
  },
};
