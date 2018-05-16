import './todayOrders.css';
import orders from './todayOrders.hbs';
import { createElementsFromString, getCookie } from '../../../common/utils';
import { get } from '../../../common/requests';

export default class {
  async render(target) {
    try {
      this.props = await this.getProps();
    } catch (e) {
      return target;
    }
    const cardTemplate = orders(this.props);
    target.appendChild(createElementsFromString(cardTemplate));
    return target.lastElementChild;
  }

  getProps() {
    return get('order/', { Authorization: getCookie('token') }, { currentDate: new Date() })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject();
      })
      .then(res => res.result);
  }
}
