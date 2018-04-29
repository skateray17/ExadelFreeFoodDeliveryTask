import './table.css';
import template from './table.hbs';
import weekTab from './weektab.hbs';
import menuItem from '../menuItem/menuItem.hbs';
import { createElementsFromString } from '../../../../common/utils';
import { getMenu, setMenu } from '../../../../common/menuService';
import menuObject from '../../../../common/menuObject';

export default class MenuTable {
  render(target) {
    // get req
    setMenu(menuObject);
    const weeksMenu = getMenu();
    this.renderWeektab(target, weeksMenu);
    return target;
  }
  rendermenuItems(menuObj) {
    const items = createElementsFromString(menuItem(menuObj));
    document.getElementById('menu-content').appendChild(items);
  }
  renderWeek(target, menuObj) {
    this.reloadContent();
    const props = {
      date: (menuObj) ? menuObj.date : null,
      menu: menuObj,
    };
    const menu = createElementsFromString(template(props));
    target.appendChild(menu);

    if (props.menu) {
      this.rendermenuItems(menuObj);
    } else {
      document.querySelector('.upload-menu__button').addEventListener('click', this.chooseFile);
    }
  }
  renderWeektab(target, weeksMenu) {
    const table = document.createElement('div');
    table.className = 'table-content';
    const weektab = createElementsFromString(weekTab());
    target.appendChild(weektab);
    target.appendChild(table);
    document.querySelector('#week-tab__current').addEventListener('click', () => {
      this.renderWeek(table, weeksMenu[0]);
      this.selectWeek(true);
    });
    document.querySelector('#week-tab__next').addEventListener('click', () => {
      this.renderWeek(table, weeksMenu[1]);
      this.selectWeek();
    });
    this.renderWeek(table, weeksMenu[0]);
    this.selectWeek(true);
    return target;
  }
  reloadContent() {
    document.querySelector('.table-content').innerHTML = '';
  }
  chooseFile() {
    // post menu
  }
  selectWeek(current) {
    if (current) {
      document.querySelector('#week-tab__current').classList.add('picked-week');
      document.querySelector('#week-tab__next').classList.remove('picked-week');
    } else {
      document.querySelector('#week-tab__next').classList.add('picked-week');
      document.querySelector('#week-tab__current').classList.remove('picked-week');
    }
  }
}
