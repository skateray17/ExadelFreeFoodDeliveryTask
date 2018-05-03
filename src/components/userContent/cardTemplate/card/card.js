import './card.css';
import card from './card.hbs';
import Header from '../cardHeader/header';
import OrderItem from '../orderItem/orderItem';
import ShowMore from '../showMore/showMore';
import { createElementsFromString } from '../../../../common/utils';

const TIME_TO_STOP_ORDERS = 10 * 60 * 60;
const MAX_VISIBLE_ITEMS = 3;

function getHours(date) {
  return date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds();
}

function getNumberOfCardInDom(date) {
  return date.getDate() - Date.now().getDate();
}

export default class Card {
  render(target, props) {
    const domCards = target.childNodes;
    const cardProps = this.createCardProps(props);
    const cardTemplate = card(cardProps);
    const htmlElem = createElementsFromString(cardTemplate);
    if (domCards.length < 8) {
      const cardItem = target.appendChild(htmlElem);
      this.insertCardContent(cardItem, props, target);
    } else {
      const position = domCards[getNumberOfCardInDom(new Date(props.header.date))];
      target.removeChild(position);
      const cardItem = target.insertBefore(htmlElem, domCards[position + 1]);
      this.insertCardContent(cardItem, props, target);
    }
    target.addEventListener('click', (event) => {
      if (event.target === htmlElem.querySelector('.edit-button')) {
        props.callback(1);
      }
    });
  }

  createOrderItem(cardItem, order) {
    const orderItem = new OrderItem();
    orderItem.render(cardItem.querySelector('.card-content'), order);
  }

  createShowMore(target, props) {
    const showMore = new ShowMore();
    showMore.render(target.querySelector('.free-space'), {
      numberOfAdditionalOrders: props.orders.length - MAX_VISIBLE_ITEMS,
    });
  }

  createHeaderProps(props) {
    const date = new Date(props.date);
    return {
      weekday: props.weekday,
      date: `${(`0${date.getDate()}`).slice(-2)}.${(`0${date.getMonth()}`).slice(-2)}`,
      headerStyle: props.active ? 'active-card' : 'inactive-card',
    };
  }

  createCardProps(props) {
    return {
      orderPrice: props.orderPrice,
      active: props.header.active,
      button: props.orders.length > 0 ? 'Редактировать' : 'Заказать',
      sumPrice: props.orders.length > 0,
      emptyMenu: props.orders.length === 0,
      showButton: new Date(props.header.date).getDate() === new Date().getDate() ?
        (getHours(new Date()) < TIME_TO_STOP_ORDERS) : true,
    };
  }

  insertCardContent(cardItem, props, target) {
    const header = new Header();
    header.render(cardItem.querySelector('.header'), this.createHeaderProps(props.header));

    if (props.orders.length > MAX_VISIBLE_ITEMS && props.header.active) {
      this.createShowMore(target, props);

      for (let i = 0; i < MAX_VISIBLE_ITEMS; i++) {
        this.createOrderItem(target, props.orders[i]);
      }
    } else if (
      props.orders.length > 0
      && props.orders.length <= MAX_VISIBLE_ITEMS
      && props.header.active
    ) {
      for (const order of props.orders) {
        this.createOrderItem(cardItem, order);
      }
    }
  }
}
