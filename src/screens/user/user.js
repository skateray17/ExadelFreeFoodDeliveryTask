import './user.css';
import template from './user.hbs';
import Header from '../../components/header/header';
import { createElementsFromString } from '../../common/utils';
import Card from '../../components/userContent/cardTemplate/card';

const VISIBLE_NUMBER_OF_CARDS = 8;
const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const engDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

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
    date: '2018-04-29T21:00:00.000Z',
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
    date: '2018-04-30T21:00:00.000Z',
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
    date: '2018-05-01T21:00:00.000Z',
    _id: '5adee2bd192937063c8345b9',
    totalPrice: 60.34,
  },

  {
    dishList: [
      {
        _id: '5adee2bd192937063c8345c2',
        dishTitle: 'блинчики',
        amount: 4,
      },
      {
        _id: '5adee2bd192937063c8345b5',
        dishTitle: 'компот',
        amount: 1,
      },
    ],
    date: '2018-05-02T21:00:00.000Z',
    _id: '5adee2bd192937063c8345b8',
    totalPrice: 20.15,
  },
];
const menuFromServer = {
  date: '30.04.2018-06.05.2018',
  menu: {
    date: '30.04.2018-06.05.2018',
    mon: {
      day: '2018-04-29T21:00:00.000Z',
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
      day: '2018-04-20T21:00:00.000Z',
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
      day: '2018-05-01T21:00:00.000Z',
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
      day: '2018--05-02T21:00:00.000Z',
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
      day: '2018-05-03T21:00:00.000Z',
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
      day: '2018-05-04T21:00:00.000Z',
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

function createPropsForCards() {
  const propsForCards = [];

  for (const day of userOrders) {
    if (new Date(day.date).getTime() > new Date().getTime()) {
      let cardProps = {};
      const date = new Date(day.date);
      cardProps = {
        header: createHeaderForCard(date),
        orderPrice: day.totalPrice,
        orders: [],
      };

      for (const order of day.dishList) {
        const dayOfTheWeek = engDays[new Date(day.date).getDay()];
        const dishes = menuFromServer.menu[dayOfTheWeek].menu;

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
      propsForCards.push(cardProps);
    }
  }
  return propsForCards;
}

function createInactiveCard(date) {
  return {
    header: createHeaderForCard(date),
    orders: [],
  };
}

function clearHours(date) {
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}
export default class UsersScreen {
  constructor() {
    this.cards = [];
  }

  render(target, props) {
    const header = new Header();
    header.render(target, props);
    const screen = createElementsFromString(template());
    target.appendChild(screen);

    let propsForCards = createPropsForCards(userOrders);

    let currentDate = new Date();
    currentDate = clearHours(currentDate);

    let indexOfCheckedCard = 0;
    for (let i = 0; i < VISIBLE_NUMBER_OF_CARDS + 1; i++) {
      if (
        currentDate !== new Date(propsForCards[indexOfCheckedCard].header.date).getTime() &&
        new Date(currentDate).getDay() !== 0
      ) {
        propsForCards.push(createInactiveCard(new Date(currentDate)));
      } else {
        indexOfCheckedCard += 1;
      }
      currentDate += 24 * 60 * 60 * 1000;
    }

    propsForCards = propsForCards.sort((x, y) => new Date(x.header.date).getTime() - new Date(y.header.date).getTime());

    for (const props of propsForCards) {
      const card = new Card();
      this.cards.push(card);
      card.render(target.querySelector('.menus-cards-container'), props);
    }
    return screen;
  }
}

