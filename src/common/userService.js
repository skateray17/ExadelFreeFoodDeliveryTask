import { get } from './requests';

let currentUser;

function loadUserInfo() {
  currentUser = get('user/', {}).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject();
  }).then((data) => {
    const { firstName, lastName, type } = data;
    const user = { username: `${firstName} ${lastName}`, type };
    return (user);
  });
}

export function getUserInfo() {
  if (!currentUser) {
    loadUserInfo();
  }
  return currentUser;
}

export function setUserInfo(newUser) {
  if (newUser) {
    currentUser = new Promise(resolve => (resolve(newUser)));
  } else {
    currentUser = undefined;
  }
}

