import './editCard.css';
import card from './editCard.hbs';
import Header from '../cardHeader/header';
import MenuItem from '../menuItem/menuItem';
import { createElementsFromString } from '../../../../common/utils';

export default class EditCard {
  constructor() {
    this.state = {
      totalCost: 0,
      order: [],
      target: null,
    };
    this.callback = this.callback.bind(this);
    this.updateTotal = this.updateTotal.bind(this);
  }
  render(target, props) {
    const cardTemplate = card(this.createCardProps(props));
    target.appendChild(createElementsFromString(cardTemplate));
    this.state.target = target;
    this.state.totalCost = props.totalCost;
    this.updateTotal();
    const header = new Header();
    header.render(target.querySelector('.header'), this.createHeaderProps(props.header));

    if (props.menu) {
      let I = 0;
      props.menu.forEach((item) => {
        const temp = item;
        if (!temp.quantity) {
          temp.quantity = 0;
        }
        if (!temp.index) {
          temp.index = I++;
        }
        this.state.order.push(temp);
        this.createMenuItem(target, temp);
      });
    }
    target.querySelector('.edit-card-clear').addEventListener('click', () => {
      this.clear();
    });
    target.querySelector('.edit-card-sub').addEventListener('click', () => {
      this.submit();
    });
  }
  updateTotal() {
    this.state.target.querySelector('.edit-card-txt-C').innerHTML = `${this.state.totalCost.toFixed(2)}Р`;
  }
  callback(state) {
    this.state.order[state.index].quantity = state.quantity;
    this.state.totalCost = 0;
    this.state.order.forEach((el) => {
      this.state.totalCost += el.quantity * el.cost;
    });
    this.updateTotal();
  }
  clear() {
    this.state.target.removeChild(this.state.target.firstChild);
  }
  submit() {
    ;
  }

  createMenuItem(target, item) {
    const menuItem = new MenuItem();
    menuItem.render(target.querySelector('.edit-card-content'), item, this.callback);
  }

  createHeaderProps(props) {
    return {
      weekday: props.weekday,
      date: props.date,
      headerStyle: 'active-card',
    };
  }

  createCardProps(props) {
    return {
      menu: props.menu,
      totalCost: props.totalCost,
    };
  }
}
