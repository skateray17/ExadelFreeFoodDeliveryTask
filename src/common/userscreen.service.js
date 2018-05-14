import { get } from './requests';
import {getCookie} from "./utils";

export function getMenu() {
  return get('menu/', { 'Content-Type': 'application/json', Authorization: getCookie('token') }, null).then(res => {
    res.json();
  }).then(menu => {
    return menu;
  });
}