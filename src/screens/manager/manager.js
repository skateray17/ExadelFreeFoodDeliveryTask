import './manager.css';
import template from './manager.hbs';
import Header from '../../components/header/header';
import Menu from '../../components/managerContent/menuContent/menuTable/table';
import { createElementsFromString } from '../../common/utils';

export default class ManagerHomeScreen {
  render(screenTarget, props) {
    const header = new Header();
    header.render(screenTarget, props);
    const screen = createElementsFromString(template());
    screenTarget.appendChild(screen);
    const contentTarget = document.getElementById('manager-content');
    this.renderMenu(contentTarget);
    return screenTarget;
  }
  renderMenu(target) {
    const menu = new Menu();
    target.innerHTML = '';
    menu.render(target);
    this.selectTab(document.getElementById('upload-menu-tab'));
    return target;
  }
  selectTab(tab) {
    tab.classList.add('nav-bar-selected');
  }
}
