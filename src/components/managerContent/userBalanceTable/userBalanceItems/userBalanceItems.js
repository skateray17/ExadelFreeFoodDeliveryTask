import './userBalanceItems.css';
import template from './userBalanceItems.hbs';
import { createElementsFromString } from '../../../../common/utils';
import Toast from '../../../toast/toast';
import { changeUserBalance } from '../../../../common/balanceService';

export default class UserBalanceItems {
  render(target, props) {
    if (this.elem && (!target || target === this.elem.parentNode)) {
      this.rerender(props);
      return this.elem;
    }
    this.props = props;
    this.elem = createElementsFromString(template(props));
    this.setEvent();
    target.appendChild(this.elem);
    return this.elem;
  }

  rerender(props) {
    this.props = props;
    const newElem = createElementsFromString(template(props));
    this.elem.replaceWith(newElem);
    this.elem = newElem;
    this.setEvent();
    return this.elem;
  }

  setEvent() {
    this.elem.onsubmit = (e) => {
      e.stopImmediatePropagation();
      e.preventDefault();
      const input = e.target.elements[0];
      const toAdd = Number.parseFloat(input.value);
      input.value = '';
      if (!Number.isNaN(toAdd)) {
        const ind = [].indexOf.call(this.elem.children, e.target) - 1;
        console.log(ind, this.props);
        changeUserBalance(this.props.result[ind].username, toAdd)
          .then((res) => {
            this.props.result[ind].balance = res.balance;
            this.rerender(this.props);
          })
          .catch(() => Toast.show({ title: 'Something went wrong', type: 'error', canDismiss: true }));
      }
    };
    this.elem.onkeypress = (e) => {
      if (e.target.tagName === 'INPUT') {
        const symbol = String.fromCharCode(e.which);
        const isBadSymbol = !/^[+-]?\d*(\.\d{0,2})?\r?$/g.test(e.target.value + symbol);
        if (isBadSymbol) {
          e.preventDefault();
        }
      }
    };
  }
}
