import { getUserInfo } from './common/userService';
import { checkType } from './common/utils';
import { checkCookie } from './common/cookieService';

export default class Guards {
  static authGuard(path) {
    const auth = checkCookie('token');
    let type;
    if (!auth && path !== 'login') {
      return new Promise(resolve => (resolve({ allow: auth, path: 'login' })));
    }
    return getUserInfo().then((curUser) => {
      type = curUser.type;
      const rolePath = checkType(type);
      if (path === 'login') {
        return { allow: !auth, path: rolePath };
      }
    });
  }

  static roleGuard(roles) {
    return function () {
      let type;
      return getUserInfo().then((curUser) => {
        type = curUser.type;
        const isAllowed = (roles.indexOf(+type) !== -1);
        return { allow: isAllowed, path: 'error' };
      });
    };
  }
}
