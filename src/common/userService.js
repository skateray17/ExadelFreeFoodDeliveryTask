let currentUser = {};

export function getUserInfo() {
  return currentUser;
}

export function setUserInfo(newUser) {
  currentUser = newUser;
}
