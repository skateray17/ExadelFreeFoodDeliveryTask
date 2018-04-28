import { getUserInfo } from './common/user.service';
import { checkType } from './common/utils';
import { checkCookie } from './common/utils';

export default class Guards {
  static authGuard(path) {
    const auth = checkCookie('token');
    const rolePath = checkType(getUserInfo().type);
    if (path !== 'login') {
      return { allow: auth, path: 'login' };
    }
    return { allow: !auth, path: rolePath };
  }

  static roleGuard(roles) {
    return function () {
      const isAllowed = (roles.indexOf(+getUserInfo().type) !== -1);
      return { allow: isAllowed, path: 'error' };
    };
  }
}
