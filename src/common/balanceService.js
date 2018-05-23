let currentBalance;

export function setBalance(balance) {
  currentBalance = balance;
}

export function getBalance() {
  return currentBalance;
}

export function onBalanceChange(target, props, balance) {
  setBalance(balance);
  this.render(target, props);
}
