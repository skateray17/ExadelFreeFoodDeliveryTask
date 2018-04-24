import './card.css';
import card from './card.hbs';
import Header from './cardHeader/header';
import OrderItem from './orderItem/orderItem';
import ShowMore from './showMore/showMore';


export default class Card {
  render(target, props) {
    let orderPrice = 0;
    for (const order of props.orders) {
      orderPrice += order.price;
    }

    const cardContext = {
      orderPrice,
      active: props.header.active,
      button: props.orders.length > 0 ? 'Редактировать' : 'Заказать',
      sumPrice: props.orders.length > 0,
    };

    const cardTemplate = card(cardContext);
    target.innerHTML = cardTemplate;

    if (props.header.active) {
      props.header.headerStyle = 'active-card';
    } else {
      props.header.headerStyle = 'inactive-card';
    }

    const header = new Header();
    header.render(target.querySelector('.header'), props.header);

    if (!props.header.active) {
      const cardContent = target.querySelector('.card-content');
      cardContent.innerText = 'Меню еще недоступно';
      target.querySelector('.card-inside').style.justifyContent = 'center';
      target.querySelector('.card-inside').style.textAlign = 'center';
    } else if (props.orders.length > 4) {
      const showMore = new ShowMore();
      showMore.render(target.querySelector('.free-space'), {
        numberOfAdditionalOrders: props.orders.length - 3,
      });

      for (let i = 0; i < 4; i++) {
        const orderItem = new OrderItem();
        orderItem.render(target.querySelector('.card-content'), props.orders[i]);
      }
    } else if (props.orders.length > 0 && props.orders.length <= 4) {
      for (const order of props.orders) {
        const orderItem = new OrderItem();
        orderItem.render(target.querySelector('.card-content'), order);
      }
    } else if (props.orders.length === 0) {
      const cardContent = target.querySelector('.card-content');
      cardContent.innerText = 'Меню не выбрано';
      target.querySelector('.card-content').style.textAlign = 'center';

      const dog = document.createElement('img');
      dog.src = 'images/spottyDog.jpg';
      target.querySelector('.card-content').appendChild(dog);
    }
  }
}
