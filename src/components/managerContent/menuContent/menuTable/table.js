import './table.css';
import MenuHTML from './table.hbs';
import weekTab from './weektab.hbs';
import MenuItem from '../menuItem/menuItem.hbs';
import { createElementsFromString } from '../../../../common/utils';
import { getMenu, setMenu } from '../../../../common/menuService';
import MenuObj from '../../../../common/menuObject';

function renderMenuItems(menuObj) {
  const items = MenuItem(menuObj);
  document.getElementById('menu-content').innerHTML = items;
}

export default class MenuTable {
  render(target) {
    this.selectTab();
    // get req
    setMenu(MenuObj);
    const weeksMenu = getMenu();
    this.renderWeektab(target, weeksMenu);
    // this.renderWeek(target, MenuObj[0]);
    return target;
  }
  selectTab() {
    const tab = document.getElementById('upload-menu-tab');
    tab.classList.add('nav-bar-selected');
  }
  chooseFile() {
    // post menu
    console.log('hi');
  }
  renderWeek(target, menuObj) {
    const props = {
      date: (menuObj) ? menuObj.date : null,
      menu: (menuObj) ? true : false,
    };
    const menu = createElementsFromString(MenuHTML(props))[0];
    target.appendChild(menu);

    if (props.menu) {
      renderMenuItems(menuObj);
    } else {
      document.getElementsByClassName('upload-menu__button')[0].addEventListener('click', this.chooseFile);
    }
  }
  renderWeektab(target, weeksMenu) {
    const weektab = createElementsFromString(weekTab())[0];
    target.appendChild(weektab);
    document.querySelector('#week-tab__current').addEventListener('click', () => {
      this.renderWeek(target, weeksMenu[0]);
    });
    document.querySelector('#week-tab__next').addEventListener('click', () => {
      this.renderWeek(target, weeksMenu[1]);
    });
    return target;
  }
  reloadContent() {
    const parent = document.getElementById('admin-content');
    parent.removeChild(parent.lastChild);
  }
}

