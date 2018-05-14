import './table.css';
import tableTemplate from './table.hbs';
import menuTableTemplate from './menuTable.hbs';
import weekTabTemplate from './weektab.hbs';
import menuItem from '../menuItem/menuItem.hbs';
import { createElementsFromString, getCookie } from '../../../../common/utils';
import { getMenu, setMenu, setWeekMenu } from '../../../../common/menuService';
import { get, post } from '../../../../common/requests';

export default class MenuTable {
  render(target) {
    this.getMenu()
      .then(() => {
        const weeksMenu = getMenu();
        this.renderContent(target, weeksMenu);
      });
    return target;
  }
  renderContent(target, weeksMenu) {
    const content = createElementsFromString(menuTableTemplate());
    this.renderWeektab(content, weeksMenu);
    this.renderWeek(content.querySelector('.menu-table-component__content'), weeksMenu[0], true);
    target.appendChild(content);
    return target;
  }

  rendermenuItems(target, menuObj) {
    const items = createElementsFromString(menuItem(menuObj));
    target.appendChild(items);
  }

  renderWeek(target, menuObj, current) {
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
      target.querySelector('.upload-menu__button').addEventListener('click', (e) => {
        e.preventDefault();
        this.uploadMenu(target, current);
      });
    }
    return target;
  }

  renderWeektab(content, weeksMenu) {
    const target = content.querySelector('.menu-table-component__tabs');
    const weektab = createElementsFromString(weekTabTemplate());
    target.appendChild(weektab);
    this.selectWeek(target, true);
    target.querySelector('.week-tab__current').addEventListener('click', () => {
      this.renderWeek(content.querySelector('.menu-table-component__content'), weeksMenu[0], true);
      this.selectWeek(target, true);
    });
    target.querySelector('.week-tab__next').addEventListener('click', () => {
      this.renderWeek(content.querySelector('.menu-table-component__content'), weeksMenu[1], false);
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

  uploadMenu(target, current) {
    const file = document.querySelector('.choose-file').files[0];
    if (file) {
      post('menu/', {
        authorization: getCookie('token'),
        'content-type': 'text/plain',
      }, {}, file)
        .then((res) => {
          if (res.status !== 200) {
            return Promise.reject();
          }
          return res.json();
        })
        .then((res) => {
          this.showWeek(target, res, current);
        })
        .catch(() => {
          document.querySelector('.upload-menu__message').innerText = 'Cannot load file. Please try again.';
          document.querySelector('.choose-file').value = '';
        });
    } else {
      document.querySelector('.upload-menu__message').innerText = 'Please select file.';
    }
  }
  showWeek(target, menu, isCurrent) {
    setWeekMenu(menu, isCurrent);
    const menuIndex = (isCurrent) ? 0 : 1;
    this.renderWeek(target, getMenu()[menuIndex], isCurrent);
  }
  getMenu() {
    return get('menu/', {
      authorization: getCookie('token'),
    })
      .then(res => res.json())
      .then((data) => {
        setMenu(data);
      })
      .catch(() => {
        console.error();
      });
  }
}
