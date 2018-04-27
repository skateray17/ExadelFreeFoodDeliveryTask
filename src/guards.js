export default class Guards {
  static checkRole(role) {
    let rolePath;
    if (role === 'user') {
      rolePath = 'main';
    }
    if (role === 'admin') {
      rolePath = 'admin';
    }
    return rolePath;
  }

  static guestGuard() {
    const token = document.cookie.token;
    const auth = (token === null || token === undefined);
    const role = 'user';
    const rolePath = Guards.checkRole(role);
    return { allow: !auth, path: rolePath };
  }

  static authGuard() {
    const token = document.cookie.token;
    const auth = (token !== null && typeof token !== 'undefined');
    const role = 'user';
    const rolePath = Guards.checkRole(role);
    return { allow: auth, path: 'login' };
  }

  static roleGuard(roles) {
    return function () {
      const role = 'user';
      const isAllowed = (roles.indexOf(role) !== -1);
      const rolePath = Guards.checkRole(role);
      return { allow: isAllowed, path: 'error' };
    };
  }
}
