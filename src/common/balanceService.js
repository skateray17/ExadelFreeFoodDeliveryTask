import { eventBus } from './eventBus';

export function onBalanceChange(target, props, balance) {
  eventBus.publish('onCookieUpdate', balance);
  this.render(target, props);
}
