import { get } from './requests';

export function getUserOrders(startDate, endDate) {
  return get('order/', {}, { startDate, endDate }).then(res => res.json()).then(userOrders => userOrders.result);
}
