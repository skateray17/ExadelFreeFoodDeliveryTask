import './makeOrderFooter.css';
import template from './makeOrderFooter.hbs';
import { createElementsFromString } from '../../../../common/utils';
import { put } from '../../../../common/requests';
import { fetchMenu } from '../../../../common/menuService';
import { daysByNumbers } from '../../../../common/constants';
import Spinner from '../../../../components/spinner/spinner';
import MakeOrderPage from '../makeOrder';

function isMenuForTodayAvailable() {
  return fetchMenu().then((res) => {
    const tmp = new Date().getDay();
    const day = daysByNumbers[tmp];
    return res[0][day].available;
  });
}
export default class makeOrderFooter {
  render(target, props) {
    const element = target.appendChild(createElementsFromString(template(props)));
    element.querySelector('.make-order_print-button').addEventListener('click', () => (new MakeOrderPage()).printTable());
    isMenuForTodayAvailable().then((res) => {
      if (res) {
        element.querySelector('.make-order_submit-button').addEventListener('click', () => {
          const spinner = new Spinner();
          spinner.render(document.querySelector('.content'));
          put('menu/', { 'Content-Type': 'application/json' }, {}, JSON.stringify({ available: false }))
            .then((response) => {
              if (response.ok) {
                element.querySelector('.make-order_submit-button').style = 'cursor: not-allowed;';
                element.querySelector('.make-order_submit-button').setAttribute('disabled', 'true');
              }
            }).finally(() => {
              spinner.destroy();
            });
        });
      } else {
        element.querySelector('.make-order_submit-button').style = 'cursor: not-allowed;';
        element.querySelector('.make-order_submit-button').setAttribute('disabled', 'true');
      }
    });

    return element;
  }
}
