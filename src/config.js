import LoginScreen from './screens/login/login';
import ErrorScreen from './screens/error/error';
import AdminHomeScreen from './screens/admin/admin';

export const routes = {
  login: {
    component: LoginScreen,
    guards: [],
  },
  main: {
    component: LoginScreen,
    guards: [],
  },
  admin: {
    component: AdminHomeScreen,
    guards: [],
  },
  error: {
    component: ErrorScreen,
    guards: [],
  },
  rootPath: 'main',
};
