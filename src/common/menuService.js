let CurrentMenu;
let NextMenu;
const Menu = [];
function getDayName(key) {
  let day;
  switch (key) {
    case 'mon':
      day = 'Monday';
      break;
    case 'tue':
      day = 'Tuesday';
      break;
    case 'wed':
      day = 'Wednesday';
      break;
    case 'thu':
      day = 'Thursday';
      break;
    case 'fri':
      day = 'Friday';
      break;
    case 'sat':
      day = 'Saturday';
      break;
    default:
      day = 'common';
      break;
  }
  return day;
}
function setWeekMenu(obj, flag) {
  const days = [];
  Object.entries(obj).forEach((elem) => {
    const key = elem[0];
    const val = elem[1];
    if (key !== 'date' && key !== 'common') {
      days.push({
        day: getDayName(key),
        menuExists: val.menu.length,
        dish: val.menu,
      });
    }
  });
  if (flag) {
    CurrentMenu = {
      date: obj.date,
      days,
    };
    Menu.push(CurrentMenu);
  } else {
    NextMenu = {
      date: obj.date,
      days,
    };
    Menu.push(NextMenu);
  }
}

export function getMenu() {
  return Menu;
}
export function setMenu(obj) {
  setWeekMenu(obj[0], true);
  setWeekMenu(obj[1], false);
}
