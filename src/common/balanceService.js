import { get, put } from './requests';
import { eventBus } from './eventBus';

let currentBalance;

export function loadBalance() {
  currentBalance = get('balance/', {}).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject();
  }).then((data) => {
    const { balance } = data;
    eventBus.publish('onBalanceChange', balance);
    return balance;
  });
}

export function getBalance() {
  if (!currentBalance) {
    loadBalance();
  }
  return currentBalance;
}

export function setBalance(balance) {
  if (balance) {
    currentBalance = new Promise(resolve => (resolve(balance)));
  } else {
    currentBalance = undefined;
  }
}

export function onBalanceChange(target, props, balance) {
  currentBalance = new Promise(resolve => (resolve(balance)));
  this.render(target, props);
}

export function getBalanceByName(name, perPage, page) {
  return get('balance/', {}, {
    perPage, name, page,
  }).then((res) => {
    if (res.ok) return res.json();
    return { result: [] };
  });
}

export function changeUserBalance(username, balance) {
  return put('balance/', { 'Content-Type': 'application/json' }, {}, JSON.stringify({
    username, balance,
  })).then((res) => {
    if (res.ok) {
      loadBalance();
      return res.json();
    }
    return Promise.reject();
  });
}
