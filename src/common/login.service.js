import { removeCookie } from './utils';

export function login(email, password) {
  return fetch('https://fooddel123.herokuapp.com/api/account/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: new Headers({ 'Content-Type': 'application/json' }),
  });
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
