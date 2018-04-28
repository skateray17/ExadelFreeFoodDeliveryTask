import './admin.css';
import AdminContent from './admin.hbs';
import Header from '../../components/header/header';
import Menu from '../../components/managerContent/menuContent/menuTable/table';
import { createElementsFromString } from '../../common/utils';

export default class AdminHomeScreen {
  render(screenTarget, props) {
    const adminContent = createElementsFromString(AdminContent())[0];
    screenTarget.appendChild(adminContent);
    const contentTarget = document.getElementById('admin-content');
    this.renderMenu(contentTarget);
    const header = new Header();
    header.render(screenTarget, props);
    return screenTarget;
  }
  renderMenu(target, props) {
    const menu = new Menu();
    menu.render(target, props);
    return target;
  }
}
