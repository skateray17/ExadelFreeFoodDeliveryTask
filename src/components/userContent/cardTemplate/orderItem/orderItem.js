import './orderItem.css';
import orderItem from './orderItem.hbs';
import { createElementsFromString } from '../../../../../src/common/utils';

export default class OrderItem {
  render(target, props) {
    let orderItemTemplate = orderItem(props);
    target.appendChild(createElementsFromString(orderItemTemplate));
  }
}
