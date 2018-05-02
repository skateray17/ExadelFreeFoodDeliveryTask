import './index.css';
import Card from './components/managerContent/todayOrdersContent/todayOrders';
import Manager from './screens/manager/manager'

const card = new Card();
const m = new Manager();
m.render(document.getElementById('card-test'));
card.render(document.querySelector('.content'), {
  users: [{
    name: 'Alexander Kovalchuck',
    orders: {
      'Солянка мясная': 2,
      'Грибы ядовитые': 4,
      'Кости жареные': 20,
    },
  }, {
    name: 'Alexander Kovalchuck',
    orders: {
      'Солянка мясная': 2,
      'Грибы ядовитые': 4,
      'Кости жареные': 20,
    },
  }, {
    name: 'Alexander Kovalchuck',
    orders: {
      'Солянка мясная': 2,
      'Грибы ядовитые': 4,
      'Кости жареные': 20,
    },
  }, {
    name: 'Alexander Kovalchuck',
    orders: {
      'Солянка мясная': 2,
      'Грибы ядовитые': 4,
      'Кости жареные': 20,
    },
  }, {
    name: 'Alexander Kovalchuck',
    orders: {
      'Солянка мясная': 2,
      'Грибы ядовитые': 4,
      'Кости жареные': 20,
    },
  }, {
    name: 'Alexander Kovalchuck',
    orders: {
      'Солянка мясная': 2,
      'Грибы ядовитые': 4,
      'Кости жареные': 20,
    },
  }, {
    name: 'Alexander Kovalchuck',
    orders: {
      'Солянка мясная': 2,
      'Грибы ядовитые': 4,
      'Кости жареные': 20,
    },
  }, {
    name: 'Alexander Kovalchuck',
    orders: {
      'Солянка мясная': 2,
      'Грибы ядовитые': 4,
      'Кости жареные': 20,
      'Жареные гвозди': 42,
    },
  },
  ],
});
