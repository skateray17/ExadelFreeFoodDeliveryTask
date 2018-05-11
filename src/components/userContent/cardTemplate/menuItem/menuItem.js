import './menuItem.css';
import menuItem from './menuItem.hbs';
import { createElementsFromString } from '../../../../../src/common/utils';

export default class MenuItem {
  constructor() {
    this.state = {
      quantity: 0,
      index: 0,
    };
  }
  updateHTML(el) {
    const quantity = el.querySelector('.quantity');
    quantity.innerHTML = this.state.quantity;
  }
  render(target, props) {
    this.state.quantity = props.quantity;
    this.state.index = props.index;
    const menuItemTemplate = menuItem(props);
    const elemDOM = createElementsFromString(menuItemTemplate);
    target.appendChild(elemDOM);
    elemDOM.addEventListener('click', (event) => {
      const editContent = elemDOM;
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
        this.updateHTML(editContent);
      }
      props.callback(this.state);
    });
    return elemDOM;
  }
}
