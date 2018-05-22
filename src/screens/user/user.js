import './user.css';
import template from './user.hbs';
import Header from '../../components/header/header';
import { createElementsFromString } from '../../common/utils';
import Card from '../../components/userContent/cardTemplate/card';
import { fetchMenu } from '../../common/menuService';
import moment from 'moment';
// import { engDays } from '../../common/constants';

const VISIBLE_NUMBER_OF_CARDS = 8;
const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const engDays = [
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
];
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
    date: '2018-05-22T21:00:00.000Z',
    _id: '5adee2bd192937063c8345b7',
    totalPrice: 61.34,
  },

  {
    dishList: [
      {
        _id: '5adee2bd192937063c8345b8',
        dishTitle: 'суп из чечевицы с овощами',
        amount: 1,
      },
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
      {
        _id: '5adee2bd192937063c8345b7',
        dishTitle: 'торт',
        amount: 1,
      },
      {
        _id: '5adee2bd192937063c8345b7',
        dishTitle: 'блинчики',
        amount: 1,
      },
    ],
    date: '2018-05-27T21:00:00.000Z',
    _id: '5adee2bd192937063c8345b7',
    totalPrice: 61.34,
  },
/*
  {
    dishList: [
      {
        _id: '5adee2bd192937063c8345b8',
        dishTitle: 'суп из чечевицы с овощами',
        amount: 1,
      },
      {
        _id: '5adee2bd192937063c8345b7',
        dishTitle: 'голубцы ленивые',
        amount: 1,
      },
      {
        _id: '5adee2bd192937063c8345b7',
        dishTitle: 'торт',
        amount: 1,
      },
      {
        _id: '5adee2bd192937063c8345b7',
        dishTitle: 'блинчики',
        amount: 1,
      },
    ],
    date: '2018-05-21T21:00:00.000Z',
    _id: '5adee2bd192937063c8345b9',
    totalPrice: 6.30,
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
      {
        _id: '5adee2bd192937063c8345b7',
        dishTitle: 'блинчики',
        amount: 2,
      },
    ],
    date: '2018-05-22T21:00:00.000Z',
    _id: '5adee2bd192937063c8345b9',
    totalPrice: 7.20,
  },]
  */

];

function createHeaderForCard(day) {
  return {
    weekday: days[new Date(day.unixDay * 24000 * 3600).getDay()],
    date: new Date(day.unixDay * 24000 * 3600).toDateString(),
    active: day.menu && true,
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


function emptyCardProps(day) {
  return {
    // header: createHeaderForCard(day),
    unixDay: day.unixDay,
    menu: day.menu,
  };
}


function createPropsForCards(menuFromServer) {
  console.log(menuFromServer);

  /*
    * types of days
    *   -null -> Menu is not available
    *   -menu and order -> Card with order (checkout today card)
    *   -menu -> not ordered card
    *
  */

  const menuWithOrders = [];

  for (const week of menuFromServer) {
    const today = new Date().getTime() / 24000 / 3600;

    /**
    * inserting days just with menu
    */

    for (const weekDay of engDays) {
      const dayOfTheYear = moment(week[weekDay].day).dayOfYear();
      if (week[weekDay] && dayOfTheYear - moment().dayOfYear() <= 8 && dayOfTheYear >= moment().dayOfYear()) {
        menuWithOrders.push({
          unixDay: new Date(week[weekDay].day).getTime() / 24000 / 3600,
          menu: week[weekDay],
        });
      }
    }

    /**
     * inserting null where is no menu
     */

    if (menuWithOrders[0].unixDay > Math.floor(today)) {
      for (let i = today; i <= menuWithOrders[0].date; i++) {
        menuWithOrders.unshift({
          date: i,
          menu: null,
        });
      }
    }
  }

  /**
   * inserting orders
   */

  if (userOrders) {
    for (const order of userOrders) {
      const day = menuWithOrders.find(day => day.unixDay === Math.round(new Date(order.date).getTime() / 24000 / 3600));
      if (day) {
        day.order = order;
      }
    }
  }

  const datesToDisplay = [];

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
      datesToDisplay.push(currentDate);
    }

    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(), currentDate.getDate() + 1,
    );
  }

  const propsForCards = datesToDisplay.map(day =>
    menuWithOrders.find(c => c.unixDay === Math.round(day.getTime() / 24000 / 3600))
    || emptyCardProps({
      unixDay: Math.floor(day.getTime() / 24000 / 3600),
    }));

  console.log(propsForCards);

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

    fetchMenu().then((menu) => {
      const propsForCards = createPropsForCards(menu);

      /*
        * Forming cards with created props
      */

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

