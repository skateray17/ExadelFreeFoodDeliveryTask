import { get } from './requests';
import { getCookie } from './utils';

export function getMenu() {
  return get('menu/', { 'Content-Type': 'application/json', Authorization: getCookie('token') }, null).then((res) => {
    return res.json();
  }).then((menu) => {
    console.log(menu);
    return menu[0];
  });
}
