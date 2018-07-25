import './todayOrders.css';
import orders from './todayOrders.hbs';
import { createElementsFromString } from '../../../common/utils';
import { get } from '../../../common/requests';
import OrdersInner from './todayOrdersInner/todayOrdersInner';
import Spinner from '../../spinner/spinner';

export default class {
  render(target) {
    const elem = createElementsFromString(orders(this.props));
    const spinner = new Spinner();
    spinner.render(elem);
    this.getProps()
      .then((res) => {
        (new OrdersInner()).render(elem, res);
        const buttonPrint = document.querySelector('.today-orders_print-button');
        if (buttonPrint) {
          buttonPrint.addEventListener('click', () => {
            const printContents = document.querySelector('.today-orders__container').outerHTML;
            const screen = document.getElementById('screen');
            screen.style.display = 'none';
            const wrapper = document.createElement('div');
            wrapper.classList.add('print_orders');
            const newLi = document.createElement('div');
            newLi.innerHTML = printContents;
            wrapper.appendChild(newLi)
            document.body.insertBefore(wrapper, null);
            newLi.querySelector('.today-orders_print-button').style.display = 'none';
            window.print(printContents);
            document.body.removeChild(wrapper);
            screen.style.display = '';
          });
        }
      }).finally(() => {
        spinner.destroy();
      });
    target.appendChild(elem);
    return elem;
  }

  getProps() {
    return get('order/', {}, { currentDate: new Date() })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return { result: [] };
      })
      .then(res => res.result);
  }
}
