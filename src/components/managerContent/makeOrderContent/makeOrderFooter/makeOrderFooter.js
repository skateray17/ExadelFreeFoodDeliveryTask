import './makeOrderFooter.css';
import template from './makeOrderFooter.hbs';
import { createElementsFromString } from '../../../../common/utils';
import { put } from '../../../../common/requests';
import { fetchMenu } from '../../../../common/menuService';
import { daysByNumbers } from '../../../../common/constants';
import Spinner from '../../../../components/spinner/spinner';
import Popup from '../../../../components/popup/popup';
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
    const buttonPrint = document.querySelector('.make-order_print-button');
    if (buttonPrint) {
      buttonPrint.addEventListener('click', () => (new MakeOrderPage()).printTable());
      isMenuForTodayAvailable().then((res) => {
        if (res) {
          document.querySelector('.make-order_submit-button').addEventListener('click', () => {
            const popup = new Popup();
            popup.render(document.querySelector('body'), 'managerPage.todaysOrder.orderReminder');

            const PopUp = document.querySelector('.popup');
            if (PopUp) {
              PopUp.addEventListener('click', (e) => {
                const elem = e.target.className;
                if (elem === 'popup_content_buttons_agree') {
                  popup.close();
                  const spinner = new Spinner();
                  spinner.render(document.querySelector('.content'));
                  put('menu/', {'Content-Type': 'application/json'}, {}, JSON.stringify({available: false}))
                    .then((response) => {
                      if (response.ok) {
                        document.querySelector('.make-order_submit-button').style = 'cursor: not-allowed;';
                        document.querySelector('.make-order_submit-button').setAttribute('disabled', 'true');
                      }
                    }).finally(() => {
                      spinner.destroy();
                    });
                }
              });
            } else {
              return false;
            }
          });
        } else {
          document.querySelector('.make-order_submit-button').style = 'cursor: not-allowed;';
          document.querySelector('.make-order_submit-button').setAttribute('disabled', 'true');
        }
      });
    }
    return element;
  }
}
