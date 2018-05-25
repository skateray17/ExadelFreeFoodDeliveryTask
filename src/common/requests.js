import { getCookie } from './cookieService';

const BASE_URL = process.env.DB_HOST;

function request(method, url, headers, urlParams = {}, body, secure) {
  secure = (secure !== false);
  return fetch(`${BASE_URL}api/${url}?${
    typeof urlParams === 'object' && urlParams !== null ?
      Object.entries(urlParams).map(([key, value]) => `${key}=${value}`).join('&')
      : ''
    }`, {
    method,
    headers: (secure) ? new Headers(Object.assign(headers, {
      authorization: getCookie('token'),
    })) : headers,
    body,
  });
}

export function get(url, headers, urlParams) {
  return request('GET', url, headers, urlParams);
}

export function head(url, headers, urlParams) {
  return request('HEAD', url, headers, urlParams);
}

export function post(url, headers, urlParams, body, secure) {
  return request('POST', url, headers, urlParams, body, secure);
}

export function put(url, headers, urlParams, body) {
  return request('PUT', url, headers, urlParams, body);
}

export function Delete(url, headers, urlParams, body) {
  return request('DELETE', url, headers, urlParams, body);
}

export function patch(url, headers, urlParams, body) {
  return request('PATCH', url, headers, urlParams, body);
}