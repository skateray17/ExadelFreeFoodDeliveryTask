import { daysOfWeek } from './constants';

let currentMenu;
let nextMenu;
const menu = [];
function setWeekMenu(obj, isCurrentWeek) {
  const days = [];
  Object.keys(obj).forEach((key) => {
    if (key !== 'date') {
      days.push({
        day: daysOfWeek[key] || 'Extra',
        menuExists: obj[key].menu.length,
        dish: obj[key].menu,
      });
    }
  });
  if (isCurrentWeek) {
    currentMenu = {
      date: obj.date,
      days,
    };
    menu.push(currentMenu);
  } else {
    nextMenu = {
      date: obj.date,
      days,
    };
    menu.push(nextMenu);
  }
}

export function getMenu() {
  return menu;
}
export function setMenu(obj) {
  setWeekMenu(obj[0], true);
  if (obj[1]) {
    setWeekMenu(obj[1], false);
  }
}
