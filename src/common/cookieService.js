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

export function onCookieUpdate(balance) {
  setCookie('balance', balance, 365);
}
