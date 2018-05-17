import './makeOrderFooter.css';
import template from './makeOrderFooter.hbs';
import { createElementsFromString, getCookie } from '../../../../common/utils';
import { put } from '../../../../common/requests';
import { fetchMenu } from '../../../../common/menuService';
import { daysByNumbers } from '../../../../common/constants';

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
          put('adminOrder/', { 'Content-Type': 'application/json', Authorization: getCookie('token') })
            .then((response) => {
              if (response.ok) {
                element.querySelector('.make-order_submit-button').style = 'cursor: not-allowed;';
              }
            });
        });
      } else {
        element.querySelector('.make-order_submit-button').style = 'cursor: not-allowed;';
      }
    });

    return element;
  }
}
