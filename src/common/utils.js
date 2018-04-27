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
