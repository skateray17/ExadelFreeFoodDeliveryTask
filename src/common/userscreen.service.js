import { get } from './requests';

export function getUserOrders(startDate, endDate) {
  return get('order/', {}, { startDate, endDate }).then(res => {
    return res.json();
  }).then(userOrders => {
    return userOrders.result;
  });
}