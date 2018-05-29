import './card.css';
import card from './card.hbs';
import Header from '../cardHeader/header';
import OrderItem from '../orderItem/orderItem';
import ShowMore from '../showMore/showMore';
import { createElementsFromString } from '../../../../common/utils';
import { rusDays } from '../../../../common/constants';
import i18n from './../../../../common/i18n';

const MAX_VISIBLE_ITEMS = 3;

export default class Card {
  constructor(target, props) {
    this.target = target;
    this.onEdit = this.onEdit.bind(this);
    this.target.addEventListener('click', this.onEdit);
    this.props = props;
    this.id = props.unixDay;
  }

  render(target, props) {
    this.props = props;
    const cardProps = this.createCardProps(props);
    const cardTemplate = card(cardProps);
    target.innerHTML = '';
    const cardItem = target.appendChild(createElementsFromString(cardTemplate));
    this.insertCardContent(cardItem, props, target);
    this.cardShadow = target.querySelector('.card.shadow');
    return cardItem;
  }
  onEdit(event) {
    if (event.target === this.target.querySelector('.edit-button')) {
      this.props.callback(Object.assign({ target: this.cardShadow }, this.props));
    }
  }
  createOrderItem(cardItem, order) {
    if (order.price) {
      order.price = (+order.price).toFixed(2);
    }
    const orderItem = new OrderItem();
    orderItem.render(cardItem.querySelector('.card-content'), order);
  }

  createShowMore(target, props) {
    const showMore = new ShowMore();
    showMore.render(target.querySelector('.free-space'), {
      numberOfAdditionalOrders: props.order.length - MAX_VISIBLE_ITEMS,
    });
  }

  createHeaderProps(props) {
    const date = new Date(props.unixDay * 24000 * 3600);
    return {
      weekday: rusDays[new Date(props.unixDay * 24000 * 3600).getDay()],
      date: `${(`0${date.getDate()}`).slice(-2)}.${(`0${date.getMonth() + 1}`).slice(-2)}`,
      headerStyle: props.menu && true ? 'active-card' : 'inactive-card',
    };
  }

  createCardProps(props) {
    return {
      totalPrice: props.order ? props.order.totalPrice.toFixed(2) : null,
      active: props.menu && true,
      button: props.order && true ? i18n.t('userPage.editOrder') : i18n.t('userPage.makeAnOrder'),
      sumPrice: props.order && true,
      emptyMenu: !(props.menu && true),
      emptyOrder: !(props.order && true),
      showButton: props.menu && true ? props.menu.available : false,
      imageUrl: require('../../../../images/not-chosen-menu.png'),
    };
  }

  insertCardContent(cardItem, props, target) {
    const header = new Header();
    header.render(cardItem.querySelector('.header'), this.createHeaderProps(props));

    if (props.order) {
      if (props.order.length > MAX_VISIBLE_ITEMS /* && props.header.active */) {
        this.createShowMore(target, props);

        for (let i = 0; i < MAX_VISIBLE_ITEMS; i++) {
          this.createOrderItem(target, props.order[i]);
        }
      } else if (
        props.order.length > 0
        && props.order.length <= MAX_VISIBLE_ITEMS
        && props.menu
      ) {
        for (const order of props.order) {
          this.createOrderItem(cardItem, order);
        }
      }
    }
  }
}
