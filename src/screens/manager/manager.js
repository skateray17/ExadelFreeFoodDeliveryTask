import './manager.css';
import template from './manager.hbs';
import Header from '../../components/header/header';
import { createElementsFromString } from '../../common/utils';

export default class ManagersScreen {
  render(target, props) {
    const header = new Header();
    header.render(target, props);
    const screen = createElementsFromString(template());
    target.appendChild(screen);
    return screen;
  }
}
