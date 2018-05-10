import LoginScreen from './screens/login/login';
import ErrorScreen from './screens/error/error';
import ManagersScreen from './screens/manager/manager';
import UsersScreen from './screens/user/user';
import Guards from './guards';

export const routes = {
  login: {
    component: LoginScreen,
    guards: [Guards.authGuard],
  },
  main: {
    component: UsersScreen,
    guards: [Guards.authGuard, Guards.roleGuard([1, 10])],
  },
  manager: {
    component: ManagersScreen,
    guards: [Guards.authGuard, Guards.roleGuard([10])],
  },
  error: {
    component: ErrorScreen,
    guards: [],
  },
  rootPath: 'main',
};
