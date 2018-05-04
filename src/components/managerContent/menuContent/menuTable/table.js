import './table.css';
import table from './table.hbs';
import template from './menuTable.hbs';
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
    this.renderContent(target, weeksMenu);
    return target;
  }
  renderContent(target, weeksMenu) {
    const content = createElementsFromString(template());
    this.renderWeektab(content, weeksMenu);
    this.renderWeek(content.querySelector('.menu-table__content'), weeksMenu[0]);
    target.appendChild(content);
    return target;
  }
  rendermenuItems(target, menuObj) {
    const items = createElementsFromString(menuItem(menuObj));
    target.appendChild(items);
  }
  renderWeek(target, menuObj) {
    this.reloadContent(target);
    const props = {
      date: (menuObj) ? menuObj.date : null,
      menu: menuObj,
    };
    const menu = createElementsFromString(table(props));
    target.appendChild(menu);

    if (props.menu) {
      this.rendermenuItems(target, menuObj);
    } else {
      document.querySelector('.upload-menu__button').addEventListener('onload', this.chooseFile);
    }
    return target;
  }
  renderWeektab(content, weeksMenu) {
    const target = content.querySelector('.menu-table__tabs');
    const weektab = createElementsFromString(weekTab());
    target.appendChild(weektab);
    this.selectWeek(target, true);
    target.querySelector('.week-tab__current').addEventListener('click', () => {
      this.renderWeek(content.querySelector('.menu-table__content'), weeksMenu[0]);
      this.selectWeek(target, true);
    });
    target.querySelector('.week-tab__next').addEventListener('click', () => {
      this.renderWeek(content.querySelector('.menu-table__content'), weeksMenu[1]);
      this.selectWeek(target);
    });
    return content;
  }
  reloadContent(target) {
    target.innerHTML = '';
  }
  selectWeek(target, current) {
    if (current) {
      target.querySelector('.week-tab__current').classList.add('picked-week');
      target.querySelector('.week-tab__next').classList.remove('picked-week');
    } else {
      target.querySelector('.week-tab__next').classList.add('picked-week');
      target.querySelector('.week-tab__current').classList.remove('picked-week');
    }
  }
  chooseFile() {
    const xhr = new XMLHttpRequest();
   
    xhr.open('POST', '/api/menu', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


    xhr.send(body);
  }
  getRequest() {
    fetch('/api/menu', { method: 'GET' })
      .then((res) => {
        setMenu(res);
        return res;
      })
      .catch(alert);
  }
}
