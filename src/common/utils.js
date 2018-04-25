export function createElementsFromString(str){
  return new DOMParser().parseFromString(str, 'text/html').body.childNodes;
}