import { daysOfWeek } from './constants';

let currentMenu;
let nextMenu;
let menu = [];
export function setWeekMenu(obj, isCurrentWeek) {
  const days = [];
  Object.keys(obj).forEach((key) => {
    if (key !== 'date' && key !== 'published') {
      days.push({
        day: daysOfWeek[key] || 'Extra',
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
  setWeekMenu(obj[0], true);
  if (obj[1]) {
    setWeekMenu(obj[1], false);
  }
}
