import './popup.css';
import popup from './popup.hbs';
import { createElementsFromString } from '../../common/utils';
import EditCard from '../userContent/cardTemplate/editCard/editCard';

export default class Popup {
  constructor() {
    this.backClick = this.backClick.bind(this);
    this.editCardCallback = this.editCardCallback.bind(this);
  }
  render(props) {
    this.props = props;
    document.querySelector('body').appendChild(createElementsFromString(popup()));
    const elem = new props.elem();
    const popupEl = document.querySelector('.popup');
    const temp = props.data;
    temp.callback = this.editCardCallback;
    elem.render(popupEl, temp);
    popupEl.addEventListener('click', this.backClick);
  }
  editCardCallback(res) {
    if (res.status === 'Cancel') {
      this.close();
    } else {
      const orders = [];
      res.order.forEach((el) => {
        if (el.quantity !== 0) {
          const temp = {};
          temp.mass = el.weight;
          temp.name = el.name;
          temp.price = el.cost;
          temp.quantity = el.quantity;
          orders.push(temp);
        }
      });
      this.props.callback({
        orders,
        header: this.props.data.header,
      });
      this.close();
    }
  }
  backClick(event) {
    const popupEl = document.querySelector('.popup');
    if (event.target === popupEl) {
      this.close();
    }
  }
  close() {
    const popupEl = document.querySelector('.popup');
    popupEl.removeEventListener('click', this.backClick);
    document.querySelector('body').removeChild(popupEl);
  }
}
