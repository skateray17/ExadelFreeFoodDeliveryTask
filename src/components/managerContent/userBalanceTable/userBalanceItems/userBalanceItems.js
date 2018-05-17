import './userBalanceItems.css';
import template from './userBalanceItems.hbs';
import { createElementsFromString } from '../../../../common/utils';

export default class UserBalanceItems {
  render(target, props) {
    this.elem = createElementsFromString(template(props));
    target.appendChild(this.elem);
    return this.elem;
  }

  rerender(props) {
    const newElem = createElementsFromString(template(props));
    this.elem.replaceWith(newElem);
    this.elem = newElem;
    return this.elem;
  }
}
