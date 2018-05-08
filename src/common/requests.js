function request(method, url, headers, body) {
  return fetch(url, {
    method,
    headers: new Headers(headers),
    body,
  });
}

export function get(url, headers) {
  return request('GET', url, headers);
}

export function head(url, headers) {
  return request('HEAD', url, headers);
}

export function connect(url, headers) {
  return request('CONNECT', url, headers);
}

export function trace(url, headers) {
  return request('TRACE', url, headers);
}

export function post(url, headers, body) {
  return request('POST', url, headers, body);
}

export function put(url, headers, body) {
  return request('PUT', url, headers, body);
}

export function mDelete(url, headers, body) {
  return request('DELETE', url, headers, body);
}

export function options(url, headers, body) {
  return request('OPTIONS', url, headers, body);
}

export function patch(url, headers, body) {
  return request('PATCH', url, headers, body);
}
