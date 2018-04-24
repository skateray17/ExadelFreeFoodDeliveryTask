import './orderItem.css';
import orderItem from './orderItem.hbs';

export default class OrderItem {
  render(target, props) {
    let orderItemTemplate = orderItem(props);
    let fieldForOrderItem = document.createElement('div');
    fieldForOrderItem.innerHTML = orderItemTemplate;
    target.appendChild(fieldForOrderItem);
  }
}
