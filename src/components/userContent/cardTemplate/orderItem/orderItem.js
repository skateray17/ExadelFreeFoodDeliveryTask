import './orderItem.css';
import orderItem from './orderItem.hbs';

export default class OrderItem {

  constructor(props) {
    this.props = props;
  }

  render(parent) {
    let orderItemTemplate = orderItem(this.props);
    let fieldForOrderItem = document.createElement('div');
    fieldForOrderItem.innerHTML = orderItemTemplate;
    parent.appendChild(fieldForOrderItem);
  }
}
