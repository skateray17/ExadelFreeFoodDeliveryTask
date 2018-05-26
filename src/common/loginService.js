import { removeCookie, setCookie } from './cookieService';
import { post } from './requests';
import { setUserInfo } from './userService';
import { setBalance } from './balanceService';

export function login(email, password) {
  return post('account/login', {
    'Content-Type': 'application/json',
  }, null, JSON.stringify({ email, password }), false).then((res) => {
    if (!res.ok) {
      return Promise.reject();
    }
    return res.json();
  }).then((data) => {
    const {
      token, type, firstName, lastName,
    } = data;
    setCookie('token', token, 365);
    setUserInfo({ username: `${firstName} ${lastName}`, type });
    setBalance();
  });
}

export function logout(router) {
  removeCookie('token');
  setUserInfo();
  setBalance();
  router.navigate('login');
}
