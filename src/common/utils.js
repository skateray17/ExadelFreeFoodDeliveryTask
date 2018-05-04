export function createElementsFromString(str) {
  const nodes = new DOMParser().parseFromString(str, 'text/html').body.childNodes;
  let result;
  if (nodes.length === 1) {
    result = nodes[0];
  } else {
    result = document.createDocumentFragment();
    while (nodes.length) {
      result.appendChild(nodes[0]);
    }
  }
  return result;
}

export const roles = {
  user: 1,
  manager: 10,
};

const typeMapping = {
  1: 'main',
  10: 'manager',
};

export function checkType(userType) {
  return typeMapping[userType];
}

export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

export function getCookie(cname) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (!c.indexOf(name)) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export function checkCookie(key) {
  const value = getCookie(key);
  return (value !== '');
}

export function removeCookie(key) {
  setCookie(key, '', 0);
}

export function getUrlParams() {
  const props = {};
  const SearchString = window.location.search.substring(1);
  const VariableArray = SearchString.split('&');
  for (let i = 0; i < VariableArray.length; i++) {
    const KeyValuePair = VariableArray[i].split('=');
    props[KeyValuePair[0]] = KeyValuePair[1];
  }
  return props;
}
