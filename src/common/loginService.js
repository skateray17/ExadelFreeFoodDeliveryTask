import { removeCookie } from './cookieService';
import { post } from './requests';

export function login(email, password) {
  return post('account/login', {
    'Content-Type': 'application/json',
  }, null, JSON.stringify({ email, password }), false);
}

export function logout(router) {
  removeCookie('token');
  removeCookie('username');
  removeCookie('type');
  removeCookie('balance');
  router.navigate('login');
}
