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
      }
      if (!auth && path === 'login') {
        resolve({ allow: true, path: 'login' });
      }
      getUserInfo().then((curUser) => {
        type = curUser.type;
        const rolePath = checkType(type);
        if (path === 'login') {
          resolve({ allow: !auth, path: rolePath });
        }
        resolve({ allow: auth, path: rolePath });
      });
    });
  }

  static roleGuard(roles) {
    return function () {
      return new Promise((resolve) => {
        let type;
        getUserInfo().then((curUser) => {
          type = curUser.type;
          const isAllowed = (roles.indexOf(+type) !== -1);
          resolve({ allow: isAllowed, path: 'error' });
        });
      });
    };
  }
}
