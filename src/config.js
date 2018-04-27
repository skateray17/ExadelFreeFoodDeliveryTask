import LoginScreen from './screens/login/login';
import ErrorScreen from './screens/error/error';
import AdminHomeScreen from './screens/manager/manager';
import UsersScreen from './screens/user/user';
import Guards from './guards';

export const routes = {
  login: {
    component: LoginScreen,
    guards: [Guards.authGuard('login')],
  },
  main: {
    component: UsersScreen,
    guards: [Guards.authGuard('main'), Guards.roleGuard([1, 10])],
  },
  admin: {
    component: AdminHomeScreen,
    guards: [Guards.authGuard('admin'), Guards.roleGuard([10])],
  },
  error: {
    component: ErrorScreen,
    guards: [],
  },
  rootPath: 'main',
};
