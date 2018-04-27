import './card.css';
import card from './card.hbs';
import Header from './cardHeader/header';
import OrderItem from './orderItem/orderItem';
import ShowMore from './showMore/showMore';

const MAX_VISIBLE_ITEMS = 3;

export default class Card {
  render(target, props) {
    const cardTemplate = card(this.createCardProps(props));
    target.innerHTML = cardTemplate;

    const header = new Header();
    header.render(target.querySelector('.header'), this.createHeaderProps(props.header));

    if (props.orders.length > MAX_VISIBLE_ITEMS && props.header.active) {
      this.createShowMore(target, props);

      for (let i = 0; i < MAX_VISIBLE_ITEMS; i++) {
        this.createOrderItem(target, props.orders[i]);
      }
    } else if (props.orders.length > 0 && props.orders.length <= MAX_VISIBLE_ITEMS && props.header.active) {
      for (const order of props.orders) {
        this.createOrderItem(target, order);
      }
    }
  }

  createOrderItem(target, order) {
    const orderItem = new OrderItem();
    orderItem.render(target.querySelector('.card-content'), order);
  }

  createShowMore(target, props) {
    const showMore = new ShowMore();
    showMore.render(target.querySelector('.free-space'), {
      numberOfAdditionalOrders: props.orders.length - MAX_VISIBLE_ITEMS,
    });
  }

  countOrderPrice(props) {
    let orderPrice = 0;
    for (const order of props.orders) {
      orderPrice += order.price;
    }
    return orderPrice;
  }

  createHeaderProps(props) {
    return {
      weekday: props.weekday,
      date: props.date,
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
    };
  }
}
