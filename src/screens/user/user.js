import moment from 'moment';
import './user.css';
import template from './user.hbs';
import Header from '../../components/header/header';
import { createElementsFromString, makeNormalDate } from '../../common/utils';
import Card from '../../components/userContent/cardTemplate/card/card';
import { fetchMenu } from '../../common/menuService';
import { getUserOrders } from '../../common/userscreen.service';
import { engDays } from '../../common/constants';
import { put, get } from '../../common/requests';
import Toast from '../../components/toast/toast';
import Popup from '../../components/popup/popup';
import EditCard from '../../components/userContent/cardTemplate/editCard/editCard';
import Spinner from '../../components/spinner/spinner';
import { eventBus } from '../../common/eventBus';
import { onBalanceChange } from '../../common/balanceService';

const VISIBLE_NUMBER_OF_CARDS = 8;
const WEEK = VISIBLE_NUMBER_OF_CARDS * 24 * 60 * 60 * 1000;
let userOrders = [];
let menuFromServer;

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

function serverSendOrder(cardUpdates, spin) {
  const date = makeNormalDate(new Date(cardUpdates.unixDay * 24000 * 3600));
  const dishList = [];
  cardUpdates.order.forEach((el) => {
    dishList.push({
      dishTitle: el.name,
      amount: el.quantity,
    });
  });
  return put('order/', {
    'content-type': 'application/json',
  }, {}, JSON.stringify({ dishList, date }))
    .then((res) => {
      if (res.status !== 200) {
        return Promise.reject();
      }
      return res.json();
    })
    .catch((err) => {
      Toast.show({
        title: 'Server error',
        type: 'error',
        canDismiss: true,
      });
    })
    .finally(() => {
      spin.destroy();
    });
}
function serverGetBalance(res) {
  if (res) {
    get('balance', {})
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject();
        }
        return response.json();
      })
      .then((body) => {
        console.log(body.balance);
      });
  }
  return res;
}
export default class UsersScreen {
  constructor(router) {
    this.router = router;
    this.cards = [];
    this.unsubscribers = [];
    this.makePopup = this.makePopup.bind(this);
    this.update = this.update.bind(this);
    this.editCardCallback = this.editCardCallback.bind(this);
  }

  render(target, props) {
    props = {
      page: 'user',
      router: this.router,
    };

    this.header = new Header();
    this.header.render(target, props);

    this.unsubscribers.push(eventBus.subscribe('onBalanceChange', onBalanceChange.bind(this.header, target, props)));

    const screen = createElementsFromString(template());
    target.appendChild(screen);

    fetchMenu().then((menu) => {
      menuFromServer = menu;
      getUserOrders(
        new Date().toISOString().slice(0, -1),
        new Date(new Date().getTime() + WEEK).toISOString().slice(0, -1),
      ).then((res) => {
        userOrders = res;
        const propsForCards = createPropsForCards(menu);

        propsForCards.forEach((props) => {
          const cardContainer = document.createElement('div');
          target.querySelector('.menus-cards-container').appendChild(cardContainer);

          const card = new Card(cardContainer, Object.assign({ callback: this.makePopup }, props));
          card.render(cardContainer, Object.assign({ callback: this.makePopup }, props));

          this.cards.push(card);
        });

        return screen;
      });
    });
  }
  makePopup(props) {
    const { menu } = props.menu;
    const popupOrders = [];
    menu.forEach((el) => {
      popupOrders.push({
        name: el.name,
        cost: el.cost,
        quantity: 0,
        weight: el.weight,
      });
    });
    if (props.order) {
      props.order.forEach((order) => {
        popupOrders.find((el, i) => {
          if (el.name === order.name) {
            popupOrders[i].quantity = order.quantity;
            return true;
          }
          return false;
        });
      });
    }
    const propsEdit = {
      menu: props.menu,
      orders: popupOrders,
      totalCost: props.order ? props.order.totalPrice : 0,
      target: props.target,
      unixDay: props.unixDay,
    };
    const propsPopup = {
      data: propsEdit,
      elem: EditCard,
      callback: this.editCardCallback,
    };
    this.closePopup = Popup.show(propsPopup);
  }
  editCardCallback(res) {
    if (res.status === 'Cancel') {
      this.closePopup();
    } else {
      const order = [];
      res.order.forEach((el) => {
        if (el.quantity !== 0) {
          const temp = {};
          temp.mass = el.weight;
          temp.name = el.name;
          temp.price = el.cost;
          temp.quantity = el.quantity;
          order.push(temp);
        }
      });
      this.closePopup();
      const cardUpdates = {
        order,
        unixDay: res.unixDay,
        target: res.target,
        menu: res.menu,
      };
      const spin = new Spinner();
      spin.render(cardUpdates.target);
      const date = new Date(res.unixDay * 24000 * 3600);
      serverSendOrder(cardUpdates, spin)
        .then(serverGetBalance)
        .then((response) => {
          if (response) {
            if (response.totalPrice === 0) {
              cardUpdates.order = undefined;
            } else {
              cardUpdates.order.totalPrice = response.totalPrice;
            }
            this.update(cardUpdates, date);
          }
        });
    }
  }
  update(cardUpdates, date) {
    for (const card of this.cards) {
      if (new Date(card.props.unixDay * 24000 * 3600).getTime() === date.getTime()) {
        card.render(card.target, Object.assign({ callback: this.makePopup }, cardUpdates));
      }
    }

  }

  destroy() {
    this.unsubscribers.forEach(unsubscribe => unsubscribe());
  }
}

