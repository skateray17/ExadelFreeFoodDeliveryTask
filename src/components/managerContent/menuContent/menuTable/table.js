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
import Toast from '../../../toast/toast';
import i18n from './../../../../common/i18n';

export default class MenuTable {
  render(target) {
    const spinner = new Spinner();
    spinner.render(document.querySelector('.content'));
    const content = createElementsFromString(menuTableTemplate());
    target.appendChild(content);
    fetchMenu()
      .then(() => {
        const weeksMenu = getMenu();
        this.renderContent(target, weeksMenu);
      })
      .catch(() => {
        Toast.show({ title: i18n.t('other.networkError'), type: 'error' });
        this.showError(i18n.t('other.somethingWrong'));
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
    if (menuObj && !menuObj.published) {
      items.querySelector('.publish-button').addEventListener('click', () => {
        this.publishMenu(menuObj.date, isCurrent);
      });
      target.appendChild(items);
      new UploadMenuForm().render(target);
      this.showError('You can change menu by uploading new file.');
      target.querySelector('.upload-menu__button').addEventListener('click', (e) => {
        e.preventDefault();
        this.uploadMenu(target, isCurrent);
      });
    } else if (menuObj) {
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
          });
      })
      .catch(() => {
        Toast.show({ title: i18n.t('other.networkError'), type: 'error' });
      })
      .finally(() => {
        spinner.destroy();
      });
  }

  renderWeek(target, menuObj, current) {
    this.reloadContent(target);
    const props = {
      date: (menuObj) ? menuObj.date : null,
      menu: menuObj,
    };
    const menu = createElementsFromString(tableTemplate(props));
    if (!props.menu) {
      new UploadMenuForm().render(target);
      this.showError(i18n.t('managerPage.uploadMenu.nomenu'));
      target.querySelector('.upload-menu__button').addEventListener('click', (e) => {
        e.preventDefault();
        this.uploadMenu(target, current);
      });
    }
    target.appendChild(menu);
    this.rendermenuItems(target, menuObj, current);
    return target;
  }

  renderWeektab(content) {
    const target = content.querySelector('.menu-table-component__tabs');
    const weektab = createElementsFromString(weekTabTemplate());
    if (!target.querySelector('.week-tab')) {
      target.appendChild(weektab);
    }
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
      spinner.render(document.querySelector('.content'));
      const isCurrParam = current ? 'current' : 'next';
      post('menu', {
        'content-type': 'text/plain',
      }, { date: isCurrParam }, file)
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
          Toast.show({ title: i18n.t('other.networkError'), type: 'error' });
          this.showError(i18n.t('other.uploadError'));
        })
        .finally(() => {
          spinner.destroy();
        });
    } else {
      this.showError(i18n.t('managerPage.uploadMenu.noFileSelected'));
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
    const fileMsg = document.querySelector('.file-msg');
    if (fileMsg) fileMsg.innerText = i18n.t('managerPage.uploadMenu.noFileSelected');
  }
}
