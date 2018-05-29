import './editCard.css';
import card from './editCard.hbs';
import Header from '../cardHeader/header';
import MenuItem from '../menuItem/menuItem';
import { createElementsFromString } from '../../../../common/utils';
import { rusDays } from '../../../../common/constants';

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
    this.createMenuItem = this.createMenuItem.bind(this);
    this.menuItems = [];
  }
  render(target, props) {
    this.onScreenTarget = props.data.target;
    this.callback = props.callback;
    const cardTemplate = card(this.createCardProps(props.data));
    const editCardHTML = createElementsFromString(cardTemplate);
    target.appendChild(editCardHTML);
    this.target = target;
    if (props.data.totalCost) {
      this.state.totalCost = props.data.totalCost;
    }
    this.state.unixDay = props.data.unixDay;
    this.state.menu = props.data.menu;
    this.state.orderedCommon = props.data.orderedCommon;
    this.state.common = props.data.common;
    this.updateTotal();
    const header = new Header();
    header.render(target.querySelector('.header'), this.createHeaderProps(props.data));

    if (props.data.orders) {
      let I = 0;
      props.data.orders.forEach((item) => {
        const temp = item;
        if (!temp.quantity) {
          temp.quantity = 0;
        }
        if (!temp.index) {
          temp.index = I++;
        }
        if (temp.quantity === 0) {
          temp.color = 'gray';
        } else {
          temp.color = 'blue';
        }
        temp.cost = temp.cost.toFixed(2);
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
    return editCardHTML;
  }
  updateTotal() {
    this.target.querySelector('.edit-card-txt-C').innerHTML = `${this.state.totalCost.toFixed(2)} BYN`;
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
    this.menuItems.forEach((el) => {
      el.resetDish();
    });
  }
  submit() {
    this.callback({
      status: 'Ok',
      unixDay: this.state.unixDay,
      order: this.state.order,
      target: this.onScreenTarget,
      menu: this.state.menu,
      common: this.state.common,
      orderedCommon: this.state.orderedCommon,
    });
  }

  createMenuItem(target, item) {
    const menuItem = new MenuItem();
    this.menuItems.push(menuItem);
    menuItem.render(target.querySelector('.edit-card-content'), item);
  }

  createHeaderProps(props) {
    const date = new Date(props.unixDay * 24000 * 3600);
    return {
      weekday: rusDays[new Date(props.unixDay * 24000 * 3600).getDay()],
      date: `${(`0${date.getDate()}`).slice(-2)}.${(`0${date.getMonth()}`).slice(-2)}`,
      headerStyle: props.menu && true ? 'active-card' : 'inactive-card',
    };
  }

  createCardProps(props) {
    return {
      menu: props.menu,
      totalCost: props.totalCost,
    };
  }
}
