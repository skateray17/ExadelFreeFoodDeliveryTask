import './table.css';
import MenuHTML from './table.hbs';
import weekTab from './weektab.hbs';
import MenuItem from '../menuItem/menuItem.hbs';
import { createElementsFromString } from '../../../../common/utils';
import { getMenu, setMenu } from '../../../../common/menuService';
import MenuObj from '../../../../common/menuObject';

export default class MenuTable {
  render(target) {
    this.selectTab();
    // get req
    setMenu(MenuObj);
    const weeksMenu = getMenu();
    this.renderWeektab(target, weeksMenu);
    return target;
  }
  renderMenuItems(menuObj) {
    const items = MenuItem(menuObj);
    document.getElementById('menu-content').innerHTML = items;
  }
  renderWeek(target, menuObj) {
    this.reloadContent();
    const props = {
      date: (menuObj) ? menuObj.date : null,
      menu: menuObj,
    };
    const menu = createElementsFromString(MenuHTML(props))[0];
    target.appendChild(menu);

    if (props.menu) {
      this.renderMenuItems(menuObj);
    } else {
      document.getElementsByClassName('upload-menu__button')[0].addEventListener('click', this.chooseFile);
    }
  }
  renderWeektab(target, weeksMenu) {
    const table = document.createElement('div');
    table.className = 'table-content';
    const weektab = createElementsFromString(weekTab())[0];
    target.appendChild(weektab);
    target.appendChild(table);
    document.querySelector('#week-tab__current').addEventListener('click', () => {
      this.renderWeek(table, weeksMenu[0]);
    });
    document.querySelector('#week-tab__next').addEventListener('click', () => {
      this.renderWeek(table, weeksMenu[1]);
    });
    this.renderWeek(table, weeksMenu[0]);
    return target;
  }
  reloadContent() {
    document.querySelector('.table-content').innerHTML = '';
  }
  selectTab() {
    const tab = document.getElementById('upload-menu-tab');
    tab.classList.add('nav-bar-selected');
  }
  chooseFile() {
    // post menu
  }
}

