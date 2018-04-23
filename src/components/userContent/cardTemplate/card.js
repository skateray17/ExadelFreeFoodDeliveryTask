import './card.css';
import card from './card.hbs';
import Header from './cardHeader/header';
import OrderItem from './orderItem/orderItem';
import ShowMore from './showMore/showMore';


export default class Card {
  constructor(props) {
    this.props = props;
  }

  render(parent) {
    let orderPrice = 0;
    for (const order of this.props.orders) {
      orderPrice += order.price;
    }

    const cardContext = {
      orderPrice,
      active: this.props.header.active,
    };

    if (this.props.header.active) {
      cardContext.headerStyle = 'active-card';
    } else {
      cardContext.headerStyle = 'inactive-card';
    }

    const cardTemplate = card(cardContext);
    parent.innerHTML = cardTemplate;

    const header = new Header(this.props.header);
    header.render(parent.querySelector('.header'));

    if (!this.props.header.active) {
      let cardContent = parent.querySelector('.card-content');
      cardContent.innerText = 'Меню еще недоступно';
      parent.querySelector('.card-inside').style.justifyContent = 'center';
      parent.querySelector('.card-inside').style.textAlign = 'center';

    } else if (this.props.orders.length > 4) {
      const showMore = new ShowMore();
      showMore.render(parent.querySelector('.free-space'), {
        numberOfAdditionalOrders: this.props.orders.length - 3,
      });

      for (let i = 0; i < 4; i++) {
        const orderItem = new OrderItem(this.props.orders[i]);
        orderItem.render(parent.querySelector('.card-content'));
      }
    } else {
      for (const order of this.props.orders) {
        const orderItem = new OrderItem(order);
        orderItem.render(parent.querySelector('.card-content'));
      }
    }
  }
}
