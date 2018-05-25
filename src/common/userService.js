import { get } from './requests';

let currentUser = {};

export function getUserInfo() {
  return get('user/', {}).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject();
  }).then((data) => {
    const { firstName, lastName, type } = data;
    currentUser = { username: `${firstName} ${lastName}`, type };
    return currentUser;
  });
}

export function setUserInfo(newUser) {
  currentUser = newUser;
}
