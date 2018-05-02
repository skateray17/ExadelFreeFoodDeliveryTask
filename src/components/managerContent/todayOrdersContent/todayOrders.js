import './todayOrders.css';
import orders from './todayOrders.hbs';
import { createElementsFromString } from '../../../common/utils';

export default class Card {
  constructor() {
    this.state = {};
  }

  render(target, props) {
    const cardTemplate = orders(props);
    target.appendChild(createElementsFromString(cardTemplate));
  }
}
