import { get } from './requests';

let currentBalance;

export function setBalance(balance) {
  currentBalance = balance;
}

export function getBalance() {
  return get('balance/', {}).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject();
  }).then((data) => {
    currentBalance = data.balance;
    return currentBalance;
  });
}

export function onBalanceChange(target, props) {
  this.render(target, props);
}
