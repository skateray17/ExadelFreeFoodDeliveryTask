import { get } from './requests';

export function getMenu() {
  return get('menu/', { 'Content-Type': 'application/json', }, null).then(res => {
    console.log(res);
  });
}