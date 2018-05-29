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

export function replaceFirstChild(target, newChild) {
  if (target.firstChild) {
    target.removeChild(target.firstChild);
    if (target.firstChild) {
      target.insertBefore(newChild, target.firstChild);
    } else {
      target.appendChild(newChild);
    }
  } else {
    target.appendChild(newChild);
  }
}

export const roles = {
  user: '1',
  manager: '10',
};

const typeMapping = {
  1: 'main',
  10: 'manager',
};

export function checkType(userType) {
  return typeMapping[userType];
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
export function makeNormalDate(date) {
  return date.toISOString().slice(0, -1);
}

