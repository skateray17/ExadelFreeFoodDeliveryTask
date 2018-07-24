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
        const ind = [].indexOf.call(this.elem.children, e.target.parentNode) - 1;
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
        if (this.checkSymbol(symbol, e)) {
          e.preventDefault();
        }
      }
    };
  }
  checkSymbol(symbol, event) {
    return (((!symbol.match(/[0-9.]/) || (symbol === '.' && (event.target.value.indexOf('.') !== -1))) || (event.target.value.split('.')[1] || { length: 0 }).length >= 2) && (!(symbol === '-' && !event.target.value.length) &&git  event.which !== 13));
  }
}
