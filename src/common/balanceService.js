import { get } from './requests';

export default function serverGetBalance(res) {
  if (res) {
    get('balance', {})
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject();
        }
        return response.json();
      })
      .then((body) => {
        console.log(body.balance);
      });
  }
  return res;
}