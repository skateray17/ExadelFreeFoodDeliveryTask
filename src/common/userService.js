import { getCookie } from './cookieService';

export function getUserInfo() {
  return {
    username: getCookie('username'),
    type: getCookie('type'),
    balance: getCookie('balance'),
  };
}
