import './menuItem.css';
import menuItem from './menuItem.hbs';
import { createElementsFromString } from '../../../../../src/common/utils';

export default class MenuItem {
  constructor() {
    this.state = {
      quantity: 0,
      index: 0,
    };
    this.contentListener = this.contentListener.bind(this);
  }
  updateHTML(el) {
    const quantity = el.querySelector('.quantity');
    quantity.innerHTML = this.state.quantity;
  }
  contentListener(event) {
    if (event.target.className.includes('incr') || event.target.className.includes('decr')) {
      let C = true;
      if (event.target.className.includes('decr')) {
        C = false;
      }
      if (C) {
        this.state.quantity++;
      } else if (this.state.quantity !== 0) {
        this.state.quantity--;
      }
      this.updateHTML(event.currentTarget);
    }
    this.callback(this.state);
  }
  render(target, props) {
    this.state.quantity = props.quantity;
    this.state.index = props.index;
    this.callback = props.callback;
    const menuItemTemplate = menuItem(props);
    const elemDOM = createElementsFromString(menuItemTemplate);
    target.appendChild(elemDOM);
    elemDOM.addEventListener('click', this.contentListener);
    return elemDOM;
  }
}
