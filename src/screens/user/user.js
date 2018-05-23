import moment from 'moment';
import './user.css';
import template from './user.hbs';
import Header from '../../components/header/header';
import {createElementsFromString} from '../../common/utils';
import Card from '../../components/userContent/cardTemplate/card';
import { fetchMenu } from '../../common/menuService';
import { getUserOrders } from '../../common/userscreen.service';
import { engDays } from '../../common/constants';

const VISIBLE_NUMBER_OF_CARDS = 8;
const WEEK = VISIBLE_NUMBER_OF_CARDS * 24 * 60 * 60 * 1000;
let userOrders = [];

function addOrderItem(order, dishes, day) {
  for (const dish of dishes) {
    if (dish.name === order.dishTitle) {
      day.order.push({
        name: dish.name,
        mass: dish.weight,
        quantity: order.amount,
        price: dish.cost,
      });
      break;
    }
  }
}

function emptyCardProps(day) {
  return {
    unixDay: day.unixDay,
    menu: day.menu,
  };
}


function clearHours(date) {
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

function toUnixDay(date) {
  return date.getTime() / 24000 / 3600;
}

function getDatesToDisplay() {
  const dates = [];

  let currentDate = new Date();
  clearHours(currentDate);

  // case when it is sunday today

  let howManyDaysToCheck;
  if (currentDate.getDay() === 0) {
    howManyDaysToCheck = 10;
  } else {
    howManyDaysToCheck = 9;
  }

  for (let i = 0; i < howManyDaysToCheck; i++) {
    if (currentDate.getDay() !== 0) {
      dates.push(currentDate);
    }

    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(), currentDate.getDate() + 1,
    );
  }
  return dates;
}

function createPropsForCards(menuFromServer) {

  /*
    * types of days
    *   -null -> Menu is not available
    *   -menu and order -> Card with order (checkout today card)
    *   -menu -> not ordered card
    *
  */

  const menuWithOrders = [];

  for (const week of menuFromServer) {
    if (week) {
      /**
       * inserting days just with menu
       */

      for (const weekDay of engDays) {
        const dayOfTheYear = moment(week[weekDay].day).dayOfYear();
        if (week[weekDay] && dayOfTheYear - moment().dayOfYear() <= 8 && dayOfTheYear >= moment().dayOfYear()) {
          menuWithOrders.push({
            unixDay: toUnixDay(new Date(week[weekDay].day)),
            menu: week[weekDay],
          });
        }
      }
    }

  }

  /**
   * inserting orders
   */

  if (userOrders) {
    for (const order of userOrders) {
      const day = menuWithOrders.find((day) => {
        return day.unixDay === Math.round(toUnixDay(new Date(order.date)));
      });

      if (day) {
        day.order = [];
        order.dishList.forEach((item) => {
          addOrderItem(item, day.menu.menu, day);
        });
        day.order.totalPrice = order.totalPrice;
      }
    }
  }

  const datesToDisplay = getDatesToDisplay();

  const propsForCards = datesToDisplay.map(day =>
    menuWithOrders.find(c => c.unixDay === Math.round(day.getTime() / 24000 / 3600))
    || emptyCardProps({
      unixDay: Math.floor(day.getTime() / 24000 / 3600),
    }));

  return propsForCards;
}

export default class UsersScreen {
  constructor(router) {
    this.router = router;
    this.cards = [];
  }

  render(target, props) {
    props = {
      page: 'user',
      router: this.router,
    };

    const header = new Header();
    header.render(target, props);

    const screen = createElementsFromString(template());
    target.appendChild(screen);

    fetchMenu().then((menu) => {
      getUserOrders(
        new Date().toISOString().slice(0, -1),
        new Date(new Date().getTime() + WEEK).toISOString().slice(0, -1),
      ).then((res) => {
        userOrders = res;
        const propsForCards = createPropsForCards(menu);

        propsForCards.forEach((props) => {
          const cardContainer = document.createElement('div');
          target.querySelector('.menus-cards-container').appendChild(cardContainer);

          const card = new Card(cardContainer, props);
          card.render(cardContainer, props);

          this.cards.push(card);
        });

        return screen;
      });
    });
  }

  updateCard(newCardProps) {
    for (const card of this.cards) {
      if (card.id === newCardProps.id) {
        card.render(card.target, newCardProps);
      }
    }
  }
}

