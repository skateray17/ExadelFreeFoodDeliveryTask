import './userBalanceItems.css';
import template from './userBalanceItems.hbs';
import { createElementsFromString } from '../../../../common/utils';
import { put } from '../../../../common/requests';
import Toast from '../../../toast/toast';
import {loadBalance} from "../../../../common/balanceService";

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
    this.elem.onclick = (e) => {
      e.stopImmediatePropagation();
      if (e.target.tagName === 'BUTTON') {
        const input = e.target.parentNode.querySelector('.user-balance__balance-input');
        const toAdd = Number.parseFloat(input.value);
        input.value = '';
        if (!Number.isNaN(toAdd)) {
          const ind = [].indexOf.call(this.elem.children, e.target.parentNode) - 1;
          put('balance/', { 'Content-Type': 'application/json' }, {}, JSON.stringify({
            username: this.props.result[ind].username,
            balance: toAdd,
          })).then((res) => {
            if (res.ok) {
              loadBalance();
              return res.json();
            }
            return Promise.reject();
          })
            .then((res) => {
              this.props.result[ind].balance = res.balance;
              this.rerender(this.props);
            })
            .catch(() => Toast.show({ title: 'Something went wrong', type: 'error', canDismiss: true }));
        }
      }
    };
  }
}
