let currentMenu;
let nextMenu;
const menu = [];
const dayNames = {
    mon: 'Monday',
    tue: 'Tuesday',
    wed: 'Wednesday',
    thu: 'Thursday',
    fri: 'Friday',
    sat: 'Saturday',
}
function setWeekMenu(obj, flag) {
  const days = [];
  Object.entries(obj).forEach((elem) => {
    const key = elem[0];
    const val = elem[1];
    if (key !== 'date') {
      days.push({
        day: dayNames[key] || 'Extra',
        menuExists: val.menu.length,
        dish: val.menu,
      });
    }
  });
  if (flag) {
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
