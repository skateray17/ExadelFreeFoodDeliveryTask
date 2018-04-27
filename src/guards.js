import { tempUser } from './common/user.service';

export default class Guards {
  static checkRole() {
    let rolePath;
    if (tempUser.role === 1) {
      rolePath = 'main';
    }
    if (tempUser.role === 10) {
      rolePath = 'admin';
    }
    return rolePath;
  }

  static authGuard(path) {
    return function () {
      const auth = (document.cookie.indexOf('token') !== -1);
      const rolePath = Guards.checkRole();
      if (path !== 'login') {
        return { allow: auth, path: 'login' };
      }
      return { allow: !auth, path: rolePath };
    };
  }

  static roleGuard(roles) {
    return function () {
      const isAllowed = (roles.indexOf(tempUser.role) !== -1);
      const rolePath = Guards.checkRole();
      return { allow: isAllowed, path: 'error' };
    };
  }
}
