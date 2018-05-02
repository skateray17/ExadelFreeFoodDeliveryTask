import './manager.css';
import template from './manager.hbs';
import Header from '../../components/header/header';
import { createElementsFromString } from '../../common/utils';
import { logout } from '../../common/login.service';

export default class ManagersScreen {
  constructor(router) {
    this.router = router;
  }

  render(target, props) {
    const header = new Header();
    header.render(target, props);
    const screen = createElementsFromString(template());
    target.appendChild(screen);
    target.querySelector('.exit-ico').addEventListener('click', () => { logout(this.router); });
    return screen;
  }
}
