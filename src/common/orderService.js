import { makeNormalDate } from './utils';
import { put } from './requests';
import Toast from '../components/toast/toast';
import { loadBalance } from './balanceService';

export default function serverSendOrder(cardUpdates, spin) {
  const date = makeNormalDate(new Date(cardUpdates.unixDay * 24000 * 3600));
  const dishList = [];
  cardUpdates.order.forEach((el) => {
    dishList.push({
      dishTitle: el.name,
      amount: el.quantity,
    });
  });
  return put('order/', {
    'content-type': 'application/json',
  }, {}, JSON.stringify({ dishList, date }))
    .then((res) => {
      const body = res.json();
      if (res.status !== 200) {
        throw body;
      }
      loadBalance();
      return body;
    })
    .catch((body) => {
      try {
        body.then((res) => {
          Toast.show({
            title: res.message ? res.message : 'server error',
            type: 'error',
            canDismiss: true,
          });
        });
      } catch (err) {
        Toast.show({
          title: 'server error',
          type: 'error',
          canDismiss: true,
        });
      }
    })
    .finally(() => {
      spin.destroy();
    });
}
