import './user.css';
import template from './user.hbs';
import Header from '../../components/header/header';
import { createElementsFromString } from '../../common/utils';
import Card from '../../components/userContent/cardTemplate/card';

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
    date: '2018-05-06T21:00:00.000Z',
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
    date: '2018-05-07T21:00:00.000Z',
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
    date: '2018-05-08T21:00:00.000Z',
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
    if (new Date(day.date) > new Date()) {
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
import { logout } from '../../common/login.service';

export default class UsersScreen {
  constructor(router) {
    this.router = router;
  }

  render(target, props) {
    const header = new Header();
    header.render(target, props);
    const screen = createElementsFromString(template());
    target.appendChild(screen);
    return screen;
  }
}
