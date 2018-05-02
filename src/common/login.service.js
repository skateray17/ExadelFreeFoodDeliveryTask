import { removeCookie } from './utils';

export function login(email, password) {
  return fetch('http://localhost:3000/api/account/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: new Headers({ 'Content-Type': 'application/json' }),
  });
}

export function logout(router) {
  removeCookie('token');
  removeCookie('username');
  removeCookie('type');
  router.navigate('login');
}
