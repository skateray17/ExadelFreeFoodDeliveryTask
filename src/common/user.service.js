import { getCookie } from './utils';

export function getUserInfo() {
  return {
    username: getCookie('username'),
    type: getCookie('type'),
    balance: 0,
  };
}
