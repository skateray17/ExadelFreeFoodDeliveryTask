import './table.css';
import tableTemplate from './menuTable.hbs';
import menuTableTemplate from './table.hbs';
import weekTabTemplate from './weektab.hbs';
import menuItem from '../menuItem/menuItem.hbs';
import { createElementsFromString } from '../../../../common/utils';
import { getMenu, fetchMenu } from '../../../../common/menuService';
import { post, put } from '../../../../common/requests';
import errorTemplate from './error.hbs';
import Spinner from '../../../spinner/spinner';
import UploadMenuForm from '../uploadMenuForm/uploadMenuForm';

export default class MenuTable {
  render(target) {
    const spinner = new Spinner();
    spinner.render(target);
    const content = createElementsFromString(menuTableTemplate());
    target.appendChild(content);
    fetchMenu()
      .then(() => {
        const weeksMenu = getMenu();
        this.renderContent(target, weeksMenu);
      })
      .catch((error) => {
        // add toast because we need uploading menu functional on page
        console.log(error);
      })
      .finally(() => {
        spinner.destroy();
      });
    return content;
  }

  renderContent(content, weeksMenu) {
    this.renderWeektab(content, weeksMenu);
    this.renderWeek(content.querySelector('.menu-table-component__content'), weeksMenu[0], true);
    return content;
  }

  rendermenuItems(target, menuObj, isCurrent) {
    const items = createElementsFromString(menuItem(menuObj));
    if (!menuObj.published) {
      items.querySelector('.publish-button').addEventListener('click', () => {
        this.publishMenu(menuObj.date, isCurrent);
      });
      target.appendChild(items);
      new UploadMenuForm().render(target);
      target.querySelector('.upload-menu__button').addEventListener('click', (e) => {
        e.preventDefault();
        this.uploadMenu(target, isCurrent);
      });
    } else {
      target.appendChild(items);
    }
  }

  publishMenu(menuDate, isCurrent) {
    const body = {
      date: menuDate,
      published: true,
    };
    const spinner = new Spinner();
    spinner.render(document.querySelector('.content'));
    put('menu/', {
      'content-type': 'application/json',
    }, {}, JSON.stringify(body))
      .then((res) => {
        if (!res.ok) {
          return Promise.reject();
        } return res;
      })
      .then(() => {
        fetchMenu()
          .then(() => {
            this.showWeek(isCurrent);
            spinner.destroy();
          });
      })
      .catch((error) => {
        spinner.destroy();
        console.log(error);
      });
  }

  renderWeek(target, menuObj, current) {
    this.reloadContent(target);
    const props = {
      date: (menuObj) ? menuObj.date : null,
    };
    const menu = createElementsFromString(tableTemplate(props));
    target.appendChild(menu);
    this.rendermenuItems(target, menuObj, current);
    return target;
  }

  renderWeektab(content) {
    const target = content.querySelector('.menu-table-component__tabs');
    const weektab = createElementsFromString(weekTabTemplate());
    target.appendChild(weektab);
    this.selectWeek(target, true);
    target.querySelector('.week-tab__current').addEventListener('click', () => {
      this.renderWeek(content.querySelector('.menu-table-component__content'), getMenu()[0], true);
      this.selectWeek(target, true);
    });
    target.querySelector('.week-tab__next').addEventListener('click', () => {
      this.renderWeek(content.querySelector('.menu-table-component__content'), getMenu()[1], false);
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
      const spinner = new Spinner();
      spinner.render(target);
      post('menu/', {
        'content-type': 'text/plain',
      }, {}, file)
        .then((res) => {
          if (res.status !== 200) {
            return Promise.reject();
          }
          return res.json();
        })
        .then(() => {
          this.showWeek(current);
        })
        .catch(() => {
          this.showError('Cannot upload file. Please try again.');
          document.querySelector('.choose-file').value = '';
        })
        .finally(() => {
          spinner.destroy();
        });
    } else {
      this.showError('Please select file.');
    }
  }

  showWeek(isCurrent) {
    fetchMenu()
      .then(() => {
        const menu = getMenu();
        const weekMenu = (isCurrent) ? menu[0] : menu[1];
        this.renderWeek(document.querySelector('.menu-table-component__content'), weekMenu, isCurrent);
      });
  }

  showError(errorMsg) {
    const props = {
      message: errorMsg,
    };
    const error = createElementsFromString(errorTemplate(props));
    const parent = document.querySelector('.upload-menu__message')
      || document.querySelector('.manager-content');
    if (parent.childNodes[0]) {
      parent.replaceChild(error, parent.childNodes[0]);
    } else {
      parent.appendChild(error);
    }
  }
}
