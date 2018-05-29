import { getUserInfo } from './common/userService';
import { checkType } from './common/utils';
import { checkCookie } from './common/cookieService';

export default class Guards {
  static authGuard(path) {
    return new Promise((resolve) => {
      const auth = checkCookie('token');
      let type;
      if (!auth && path !== 'login') {
        resolve({ allow: auth, path: 'login' });
        return;
      }
      if (!auth && path === 'login') {
        resolve({ allow: true, path: 'login' });
        return;
      }
      getUserInfo().then((curUser) => {
        type = curUser.type;
        const rolePath = checkType(type);
        if (path === 'login') {
          resolve({ allow: !auth, path: rolePath });
          return;
        }
        resolve({ allow: auth, path: rolePath });
      });
    });
  }

  static roleGuard(roles) {
    return function () {
      return new Promise((resolve) => {
        if (checkCookie('token')) {
          let type;
          getUserInfo().then((curUser) => {
            type = curUser.type;
            const isAllowed = (roles.indexOf(+type) !== -1);
            resolve({ allow: isAllowed, path: 'error' });
          });
        } else {
          resolve({ allow: false, path: 'login' });
        }
      });
    };
  }
}
