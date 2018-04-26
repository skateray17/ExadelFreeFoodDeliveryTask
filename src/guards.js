export default class Guards {
  static authGuard() {
    const token = document.cookie.token;
    const authorized = (token !== null || token !== undefined);
    const role = 'user';
    return { allow: authorized, path: role };
  }

  static roleGuard(roles) {

  }
}
