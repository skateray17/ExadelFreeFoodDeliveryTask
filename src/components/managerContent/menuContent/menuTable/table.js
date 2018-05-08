import './table.css';
import tableTemplate from './table.hbs';
import menuTableTemplate from './menuTable.hbs';
import weekTabTemplate from './weektab.hbs';
import menuItem from '../menuItem/menuItem.hbs';
import { createElementsFromString } from '../../../../common/utils';
import { getMenu, setMenu } from '../../../../common/menuService';
import menuObject from '../../../../common/menuObject';
import { get } from '../../../../common/requests';

export default class MenuTable {
  render(target) {
    // get('https://fooddel123.herokuapp.com/api/menu', {})
    //   .then(res => res.status)
    //   .then((data) => {
    //     setMenu(data);
    //   })
    //   .catch(() => {
    //     console.error();
    //   });

    fetch('https://fooddel123.herokuapp.com/api/menu', { method: 'GET' })
      .then(res => res.status)
      .then((data) => {
        console.log(data);
      })
      .catch(() => {
        console.error();
      });
    setMenu(menuObject);
    const weeksMenu = getMenu();
    this.renderContent(target, weeksMenu);
    return target;
  }

  renderContent(target, weeksMenu) {
    const content = createElementsFromString(menuTableTemplate());
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
    const menu = createElementsFromString(tableTemplate(props));
    target.appendChild(menu);

    if (props.menu) {
      this.rendermenuItems(target, menuObj);
    } else {
      document.querySelector('.send-menu').addEventListener('submit', this.sendFile);
    }
    return target;
  }

  renderWeektab(content, weeksMenu) {
    const target = content.querySelector('.menu-table__tabs');
    const weektab = createElementsFromString(weekTabTemplate());
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

  sendFile(e) {
    e.preventDefault();
    // post req
  }
}
