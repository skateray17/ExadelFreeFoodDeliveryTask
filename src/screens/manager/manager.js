import './manager.css';
import template from './manager.hbs';
import Header from '../../components/header/header.js';
import { createElementsFromString } from '../../common/utils.js';

export default class ManagersScreen {

  constructor() {

  }

  render(target, props) {

    let header = new Header();
    header.render(target, props);
    let screen = createElementsFromString(template())[0];
    target.appendChild(screen);
    return screen;

  }

}