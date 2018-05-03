import './index.css';
import Card from './components/userContent/cardTemplate/card/card';
import EditCard from './components/userContent/cardTemplate/editCard/editCard';
import Popup from './components/popup/popup';

const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const engDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const dataFromServer = {
  dishList: [
    {
      _id: '1',
      dishTitle: 'суп из чечевицы с овощами',
      amount: 2,
    },
    {
      _id: '2',
      dishTitle: 'торт',
      amount: 1,
    },
    {
      _id: '3',
      dishTitle: 'блинчики',
      amount: 2,
    },
  ],
  date: '2018-04-25T21:00:00.000Z',
  _id: '5adee2bd192937063c8345b6',
  totalPrice: 61.34,
};

const props = {
  header: {
    weekday: days[new Date(dataFromServer.date).getDay()],
    date: new Date(dataFromServer.date).toDateString(),
    active: false,
  },
  orderPrice: dataFromServer.totalPrice,
  orders: [],
};

const menuFromServer = {
  date: '16.04.2018-22.04.2018',
  menu: {
    date: '16.04.2018-22.04.2018',
    mon: {
      day: '2018-04-15T21:00:00.000Z',
      menu: [
        {
          name: 'суп из чечевицы с овощами',
          weight: 350,
          cost: 1.3,
          quantity: 5,
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
      day: '2018-04-16T21:00:00.000Z',
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
      day: '2018-04-17T21:00:00.000Z',
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
    thu: {
      day: '2018-04-18T21:00:00.000Z',
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
      day: '2018-04-19T21:00:00.000Z',
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

for (let order of dataFromServer.dishList) {
  let dayOfTheWeek = engDays[new Date(dataFromServer.date).getDay()];
  let dishes = menuFromServer.menu[dayOfTheWeek].menu;
  for (let dish of dishes) {
    if (dish.name === order.dishTitle) {
      props.orders.push({
        name: dish.name,
        mass: dish.weight,
        quantity: order.amount,
        price: dish.cost,
      });
      break;
    }
  }
}
const propsEdit = {
  header: {
    weekday: days[new Date(dataFromServer.date).getDay() - 1],
    date: new Date(dataFromServer.date).toDateString(),
  },
  menu: menuFromServer.menu.mon.menu,
  totalCost: 6.5,
};
const propsPopup = {
  data: propsEdit,
  elem: EditCard,
};
const card = new Card();
const editCard = new EditCard();
//card.render(document.getElementById('card-test'), props);
const popup = new Popup();
popup.render(propsPopup);
//editCard.render(document.getElementById('card-test'), propsEdit);
