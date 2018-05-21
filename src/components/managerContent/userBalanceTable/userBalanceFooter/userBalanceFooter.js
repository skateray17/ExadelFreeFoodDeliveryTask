import './userBalanceFooter.css';
import template from './userBalanceFooter.hbs';
import { createElementsFromString } from '../../../../common/utils';

export default class UserBalanceFooter {
  render(target, props) {
    if (this.elem && (!target || target === this.elem.parentNode)) {
      this.rerender(props);
      return this.elem;
    }
    props.showedInterval = `${((props.currentPage - 1) * props.perPage) + 1}-${
      Math.min(props.totalAmount, props.currentPage * props.perPage)}`;
    this.elem = createElementsFromString(template(props));
    return target.appendChild(this.elem);
  }

  rerender(props) {
    props.perPage = props.perPage || 15;
    this.elem.querySelector('.user-balance__showed-interval').innerHTML =
      `${Math.min(((props.currentPage - 1) * props.perPage) + 1, props.totalAmount)}-${
      Math.min(props.totalAmount, props.currentPage * props.perPage)}`;
    this.elem.querySelector('.user-balance__total-quantity').innerHTML = props.totalAmount;
    return this.elem;
  }

  set onNextPage(callback) {
    this.elem.querySelector('.right-ico').onclick = callback;
  }

  set onPrevPage(callback) {
    this.elem.querySelector('.left-ico').onclick = callback;
  }

  set oninput(callback) {
    this.elem.querySelector('.user-balance__selected-quantity').oninput = callback;
  }
}
