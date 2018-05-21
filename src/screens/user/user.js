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
    date: '2018-05-15T21:00:00.000Z',
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
    date: '2018-05-17T21:00:00.000Z',
    _id: '5adee2bd192937063c8345b9',
    totalPrice: 60.34,
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
    date: '2018-05-18T21:00:00.000Z',
    _id: '5adee2bd192937063c8345b9',
    totalPrice: 60.34,
  },

];

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

function addOrderItemsToProps(cardProps, day, menu) {
  day.dishList.forEach((item) => {
    const dayOfTheWeek = engDays[new Date(day.date).getDay()];
    const dishes = menu[dayOfTheWeek].menu;

    addOrderItem(item, dishes, cardProps);
  });
}

function createInactiveCard(date) {
  return {
    header: createHeaderForCard(date),
    orders: [],
  };
}

function createPropsForCards(menu) {
  const cardsWithOrders = [];
  console.log("inside create props");
  console.log(menu);

  for (const day of userOrders) {
    if (new Date(day.date).getTime() >= clearHours(new Date())) {
      const cardProps = createCardPropsWithEmptyOrders(day);
      addOrderItemsToProps(cardProps, day, menu);
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


    getMenu().then(menu => {
      console.log("Menu from server ");
      console.log(menu);
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

  }

  updateCard(newCardProps) {
    for (const card of this.cards) {
      if (card.id === newCardProps.id) {
        card.render(card.target, newCardProps);
      }
    }
  }

}

