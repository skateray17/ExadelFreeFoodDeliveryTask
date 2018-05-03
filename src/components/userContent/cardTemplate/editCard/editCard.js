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
    };
    this.itemChange = this.itemChange.bind(this);
    this.updateTotal = this.updateTotal.bind(this);
    this.submit = this.submit.bind(this);
    this.cancel = this.cancel.bind(this);
  }
  render(target, props) {
    this.callback = props.callback;
    const cardTemplate = card(this.createCardProps(props));
    target.appendChild(createElementsFromString(cardTemplate));
    this.target = target;
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
        temp.callback = this.itemChange;
        this.state.order.push(temp);
        this.createMenuItem(target, temp);
      });
    }
    target.querySelector('.edit-card-cancel').addEventListener('click', () => {
      this.cancel();
    });
    target.querySelector('.edit-card-sub').addEventListener('click', () => {
      this.submit();
    });
  }
  updateTotal() {
    this.target.querySelector('.edit-card-txt-C').innerHTML = `${this.state.totalCost.toFixed(2)}Р`;
  }
  itemChange(state) {
    this.state.order[state.index].quantity = state.quantity;
    this.state.totalCost = 0;
    this.state.order.forEach((el) => {
      this.state.totalCost += el.quantity * el.cost;
    });
    this.updateTotal();
  }
  cancel() {
    this.callback({
      status: 'Cancel',
    });
  }
  submit() {
    this.callback({
      status: 'Ok',
      order: this.state.order,
    });
  }

  createMenuItem(target, item) {
    const menuItem = new MenuItem();
    menuItem.render(target.querySelector('.edit-card-content'), item);
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
