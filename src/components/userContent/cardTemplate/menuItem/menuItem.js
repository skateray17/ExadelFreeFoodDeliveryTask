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
  }
  updateHTML() {
    const quantity = this.target.querySelector('.quantity');
    quantity.innerHTML = this.state.quantity;
  }
  plusDish(event) {
    this.state.quantity++;
    this.updateHTML(event.currentTarget);
    this.callback(this.state);
  }
  minDish(event) {
    if (this.state.quantity > 0) {
      this.state.quantity--;
    }
    this.updateHTML(event.currentTarget);
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
