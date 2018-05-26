import { get } from './requests';

let currentBalance;

function loadBalance() {
  return get('balance/', {}).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject();
  }).then((data) => {
    const { balance } = data;
    return balance;
  });
}

export function getBalance() {
  if (!currentBalance) {
    currentBalance = loadBalance();
  }
  return currentBalance;
}

export function setBalance(balance) {
  currentBalance = new Promise(resolve => (resolve(balance)));
}

export function onBalanceChange(target, props) {
  this.render(target, props);
}

