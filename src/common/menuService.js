import { daysOfWeek } from './constants';
import { get } from './requests';
import i18n from './i18n';

let currentMenu;
let nextMenu;
let menu = [];
export function setWeekMenu(obj, isCurrentWeek) {
  const days = [];
  Object.keys(obj).forEach((key) => {
    if (key !== 'date' && key !== 'published') {
      days.push({
        day: daysOfWeek[key] || i18n.t('other.extra'),
        menuExists: obj[key].menu.length,
        dish: obj[key].menu,
      });
    }
  });
  if (isCurrentWeek) {
    currentMenu = {
      published: obj.published,
      date: obj.date,
      days,
    };
    menu[0] = currentMenu;
  } else {
    nextMenu = {
      published: obj.published,
      date: obj.date,
      days,
    };
    menu[1] = nextMenu;
  }
}

export function getMenu() {
  return menu;
}
export function setMenu(obj) {
  menu = [];
  if (obj[0]) {
    setWeekMenu(obj[0], true);
  }
  if (obj[1]) {
    setWeekMenu(obj[1], false);
  }
}
export function fetchMenu() {
  return get('menu/', {})
    .then((res) => {
      if (!res.ok) {
        return Promise.reject();
      } return res.json();
    })
    .then((data) => {
      setMenu(data);
      return data;
    });
}
