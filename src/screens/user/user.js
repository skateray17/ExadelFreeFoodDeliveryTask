import './user.css';
import template from './user.hbs';
import Header from '../../components/header/header';
import { createElementsFromString, getCookie } from '../../common/utils';
import Card from '../../components/userContent/cardTemplate/card/card';
import Popup from '../../components/popup/popup';
import EditCard from '../../components/userContent/cardTemplate/editCard/editCard';
import { put } from '../../common/requests';

const VISIBLE_NUMBER_OF_CARDS = 8;
const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const engDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const userOrders = [
  {
    dishList: [
      {
        _id: '5adee2bd192937063c8345b8',
        dishTitle: 'тарелка для супа',
        amount: 323,
      },
      {
        _id: '5adee2bd192937063c8345b9',
        dishTitle: 'голубцы ленивые',
        amount: 1,
      },
    ],
    date: '2018-05-09T21:00:00.000Z',
    _id: '5adee2bd192937063c8345b7',
    totalPrice: 61.34,
  },

  {
    dishList: [
      {
        _id: '5adee2bd192937063c8345b8',
        dishTitle: 'тарелка для супа',
        amount: 323,
      },
      {
        _id: '5adee2bd192937063c8345b9',
        dishTitle: 'голубцы ленивые',
        amount: 1,
      },
    ],
    date: '2018-05-10T21:00:00.000Z',
    _id: '5adee2bd192937063c8345b7',
    totalPrice: 61.34,
  },

  {
    dishList: [
      {
        _id: '5adee2bd192937063c8345b8',
        dishTitle: 'тарелка для супа',
        amount: 32,
      },
      {
        _id: '5adee2bd192937063c8345b7',
        dishTitle: 'голубцы ленивые',
        amount: 1,
      },
    ],
    date: '2018-05-11T21:00:00.000Z',
    _id: '5adee2bd192937063c8345b9',
    totalPrice: 60.34,
  },

];
const menuFromServer = {
  date: '07.05.2018-14.05.2018',
  menu: {
    date: '07.05.2018-07.05.2018',
    mon: {
      day: '2018-05-06T21:00:00.000Z',
      menu: [
        {
          name: 'суп из чечевицы с овощами',
          weight: 350,
          cost: 1.3,
        },
        {
          name: 'голубцы ленивые',
          weight: 150,
          cost: 3.2,
        },
        {
          name: 'торт',
          weight: 156,
          cost: 1.8,
        },
        {
          name: 'блинчики',
          weight: 90,
          cost: 2,
        },
        {
          name: 'хлеб',
          weight: 9,
          cost: 0.08,
        },
      ],
    },
    tue: {
      day: '2018-05-07T21:00:00.000Z',
      menu: [
        {
          name: 'суп из чечевицы с овощами',
          weight: 350,
          cost: 1.3,
        },
        {
          name: 'голубцы ленивые',
          weight: 150,
          cost: 3.2,
        },
        {
          name: 'торт',
          weight: 156,
          cost: 1.8,
        },
        {
          name: 'блинчики',
          weight: 90,
          cost: 2,
        },
        {
          name: 'хлеб',
          weight: 9,
          cost: 0.08,
        },
      ],
    },
    wed: {
      day: '2018-05-08T21:00:00.000Z',
      menu: [
        {
          name: 'суп из чечевицы с овощами',
          weight: 350,
          cost: 1.3,
        },
        {
          name: 'голубцы ленивые',
          weight: 150,
          cost: 3.2,
        },
        {
          name: 'компот',
          weight: 156,
          cost: 1.8,
        },
        {
          name: 'блинчики',
          weight: 90,
          cost: 2,
        },
        {
          name: 'хлеб',
          weight: 9,
          cost: 0.08,
        },
      ],
    },
    thu: {
      day: '2018-05-09T21:00:00.000Z',
      menu: [
        {
          name: 'суп из чечевицы с овощами',
          weight: 350,
          cost: 1.3,
        },
        {
          name: 'голубцы ленивые',
          weight: 150,
          cost: 3.2,
        },
        {
          name: 'торт',
          weight: 156,
          cost: 1.8,
        },
        {
          name: 'блинчики',
          weight: 90,
          cost: 2,
        },
        {
          name: 'хлеб',
          weight: 9,
          cost: 0.08,
        },
      ],
    },
    fri: {
      day: '2018-05-10T21:00:00.000Z',
      menu: [
        {
          name: 'суп из чечевицы с овощами',
          weight: 350,
          cost: 1.3,
        },
        {
          name: 'голубцы ленивые',
          weight: 150,
          cost: 3.2,
        },
        {
          name: 'торт',
          weight: 156,
          cost: 1.8,
        },
        {
          name: 'блинчики',
          weight: 90,
          cost: 2,
        },
        {
          name: 'хлеб',
          weight: 9,
          cost: 0.08,
        },
      ],
    },
    sat: {
      day: '2018-05-11T21:00:00.000Z',
      menu: [
        {
          name: 'суп из чечевицы с овощами',
          weight: 350,
          cost: 1.3,
        },
        {
          name: 'голубцы ленивые',
          weight: 150,
          cost: 3.2,
        },
        {
          name: 'торт',
          weight: 156,
          cost: 1.8,
        },
        {
          name: 'блинчики',
          weight: 90,
          cost: 2,
        },
        {
          name: 'хлеб',
          weight: 9,
          cost: 0.08,
        },
      ],
    },
    common: {
      menu: [
        {
          name: 'тарелка для супа',
          cost: 0.18,
        },
        {
          name: 'контейнер 250мл',
          cost: 0.1,
        },
        {
          name: 'контейнер 500мл',
          cost: 0.17,
        },
      ],
    },
  },
  __v: 0,
};

function createHeaderForCard(date) {
  const today = new Date();

  return {
    weekday: days[date.getDay()],
    date: date.toDateString(),
    active: (date.getDay() >= today.getDay()) && (date.getDate() - today.getDate() < 7),
  };
}


function createCardPropsWithEmptyOrders(day) {
  const date = new Date(day.date);
  return {
    header: createHeaderForCard(date),
    orderPrice: day.totalPrice,
    orders: [],
  };
}

function addOrderItem(order, dishes, cardProps) {
  for (const dish of dishes) {
    if (dish.name === order.dishTitle) {
      cardProps.orders.push({
        name: dish.name,
        mass: dish.weight,
        quantity: order.amount,
        price: dish.cost,
      });
      break;
    }
  }
}

function addOrderItemsToProps(cardProps, day) {
  day.dishList.forEach((item) => {
    const dayOfTheWeek = engDays[new Date(day.date).getDay()];
    const dishes = menuFromServer.menu[dayOfTheWeek].menu;

    addOrderItem(item, dishes, cardProps);
  });
}

function createInactiveCard(date) {
  return {
    header: createHeaderForCard(date),
    orders: [],
  };
}

function createPropsForCards() {
  const cardsWithOrders = [];

  for (const day of userOrders) {
    if (new Date(day.date).getTime() >= clearHours(new Date())) {
      const cardProps = createCardPropsWithEmptyOrders(day);
      addOrderItemsToProps(cardProps, day);
      cardsWithOrders.push(cardProps);
    }
  }

  const days = [];
  let currentDate = new Date();
  clearHours(currentDate);

  for (let i = 0; i < 9; i++) {
    if (currentDate.getDay() !== 0) {
      days.push(currentDate);
    }
    // const date = new Date(currentDate);
    currentDate = new Date(currentDate.getFullYear(),
      currentDate.getMonth(), currentDate.getDate() + 1);
  }

  const propsForCards = days.map(day =>
    cardsWithOrders.find(c => new Date(c.header.date).getTime() === day.getTime())
    || createInactiveCard(day));

  return propsForCards;
}


function clearHours(date) {
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

export default class UsersScreen {
  constructor() {
    this.cards = [];
    this.makePopup = this.makePopup.bind(this);
    this.update = this.update.bind(this);
    this.editCardCallback = this.editCardCallback.bind(this);
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

    const propsForCards = createPropsForCards(userOrders);

    propsForCards.forEach((props) => {
      const cardContainer = document.createElement('div');

      target.querySelector('.menus-cards-container').appendChild(cardContainer);
      const card = new Card(cardContainer, props);
      card.render(cardContainer, Object.assign(props, { callback: this.makePopup }));

      this.cards.push(card);
    });
    return screen;
  }
  makePopup(props) {
    const cardProps = props;
    const { menu } = menuFromServer.menu[`${engDays[days.indexOf(cardProps.header.weekday)]}`];
    cardProps.orders.forEach((order) => {
      menu.find((el, i) => {
        if (el.name === order.name) {
          menu[i].quantity = order.quantity;
          return true;
        }
        return false;
      });
    });
    const propsEdit = {
      header: cardProps.header,
      menu,
      totalCost: cardProps.orderPrice,
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
      const orders = [];
      res.order.forEach((el) => {
        if (el.quantity !== 0) {
          const temp = {};
          temp.mass = el.weight;
          temp.name = el.name;
          temp.price = el.cost;
          temp.quantity = el.quantity;
          orders.push(temp);
        }
      });
      this.update({
        orders,
        header: res.header,
      });
      this.closePopup();
    }
  }
  serverSendOrder(cardUpdates) {
    const date = new Date();
    const dishList = [];
    cardUpdates.orders.forEach((el) => {
      dishList.push({
        dishTitle: el.name,
        amount: el.quantity,
      });
    });
    return put('order/', {
      Authorization: getCookie('token'),
      'content-type': 'application/json',
    }, {}, JSON.stringify({ username: 'aaa', dishList, date }))
      .then(res => res.json());
  }
  update(cardUpdates) {
    this.serverSendOrder(cardUpdates)
      .then((res) => {
        console.log(res);
        for (const card of this.cards) {
          if (new Date(card.props.header.date).getTime() === date.getTime()) {
            card.render(card.target, Object.assign(cardUpdates, { callback: this.makePopup }));
          }
        }
      });
  }
}
