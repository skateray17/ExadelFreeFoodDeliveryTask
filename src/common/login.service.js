import { removeCookie } from './utils';
import { post } from './requests';

export function login(email, password) {
  return post('http://localhost:3000/api/account/login', {
    'Content-Type': 'application/json',
  }, JSON.stringify({ email, password }));
}

export function logout(router) {
  removeCookie('token');
  removeCookie('username');
  removeCookie('type');
  router.navigate('login');
}
