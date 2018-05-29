import './menuItem.css';
import menuItem from './menuItem.hbs';
import { createElementsFromString } from '../../../../../src/common/utils';

export default class MenuItem {
  constructor() {
    this.state = {
      quantity: 0,
      index: 0,
    };
    this.plusDish = this.plusDish.bind(this);
    this.minDish = this.minDish.bind(this);
    this.resetDish = this.resetDish.bind(this);
  }
  updateHTML(plus) {
    if (plus && this.state.quantity === 1) {
      const center = this.target.querySelector('.quantity-center');
      center.style.background = '#008AFF';
    } else if (!plus && this.state.quantity === 0) {
      const center = this.target.querySelector('.quantity-center');
      center.style.background = '#989ea7';
    }
    const quantity = this.target.querySelector('.quantity');
    quantity.innerHTML = this.state.quantity;
  }
  plusDish() {
    this.state.quantity++;
    this.updateHTML(true);
    this.callback(this.state);
  }
  minDish() {
    if (this.state.quantity > 0) {
      this.state.quantity--;
    }
    this.updateHTML(false);
    this.callback(this.state);
  }
  resetDish() {
    this.state.quantity = 0;
    this.updateHTML(false);
    this.callback(this.state);
  }
  render(target, props) {
    this.state.quantity = props.quantity;
    this.state.index = props.index;
    this.callback = props.callback;
    const menuItemTemplate = menuItem(props);
    const elemDOM = createElementsFromString(menuItemTemplate);
    target.appendChild(elemDOM);
    this.target = elemDOM;
    elemDOM.querySelector('.incr').addEventListener('click', this.plusDish);
    elemDOM.querySelector('.decr').addEventListener('click', this.minDish);
    return elemDOM;
  }
}
