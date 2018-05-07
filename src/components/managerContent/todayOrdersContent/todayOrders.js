import './todayOrders.css';
import orders from './todayOrders.hbs';
import { createElementsFromString } from '../../../common/utils';

export default class {
  constructor() {
    this.state = {};
  }

  render(target, props) {
    const cardTemplate = orders(props);
    target.appendChild(createElementsFromString(cardTemplate));
    return target.lastElementChild;
  }
}
