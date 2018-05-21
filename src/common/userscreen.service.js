import { get } from './requests';
import { fetchMenu } from './menuService';
import { getCookie } from './utils';
import { daysOfWeek } from './constants';

export function getMenu() {
  fetchMenu().then(menu => {
    console.log(menu[0]);
    console.log(menu[1]);
    return menu;
  });
}