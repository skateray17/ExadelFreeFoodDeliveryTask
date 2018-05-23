import './userBalanceHeader.css';
import template from './userBalanceHeader.hbs';
import { createElementsFromString } from '../../../../common/utils';

export default class UserBalanceHeader {
  render(target, props) {
    this.elem = createElementsFromString(template(props));
    return target.appendChild(this.elem);
  }

  set oninput(callback) {
    this.elem.querySelector('.user-balance__header-input').oninput = callback;
  }
}
