import './todayOrders.css';
import orders from './todayOrders.hbs';
import { createElementsFromString, getCookie } from '../../../common/utils';
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
        spinner.destroy();
        (new OrdersInner()).render(elem, res);
      });
    target.appendChild(elem);
    return elem;
  }

  getProps() {
    return get('order/', { authorization: getCookie('token') }, { currentDate: new Date() })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return { result: [] };
      })
      .then(res => res.result);
  }
}
