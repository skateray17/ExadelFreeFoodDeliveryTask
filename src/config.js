import LoginScreen from './screens/login/login';
import ErrorScreen from './screens/error/error';
import AdminHomeScreen from './screens/admin/admin';
import UsersScreen from './screens/user/user';
import Guards from './guards';

export const routes = {
  login: {
    component: LoginScreen,
    guards: [Guards.guestGuard],
  },
  main: {
    component: UsersScreen,
    guards: [Guards.authGuard, Guards.roleGuard(['admin', 'user'])],
  },
  admin: {
    component: AdminHomeScreen,
    guards: [Guards.authGuard, Guards.roleGuard('admin')],
  },
  error: {
    component: ErrorScreen,
    guards: [],
  },
  rootPath: 'main',
};
