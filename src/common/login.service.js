import { removeCookie } from './utils';
import { post } from './requests';

export function login(email, password) {
  return post('account/login', {
    'Content-Type': 'application/json',
  }, null, JSON.stringify({ email, password }));
}

export function logout(router) {
  removeCookie('token');
  removeCookie('username');
  removeCookie('type');
  router.navigate('login');
}
