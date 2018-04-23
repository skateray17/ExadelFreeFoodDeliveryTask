import './index.css';
import Card from './components/userContent/cardTemplate/card';

let props = {
  header: {
    weekday: 'Понедельник',
    date: '19.04',
    active: false,
    headerStyle: 'inactive-card',
  },
  orders: [
    {
      name: 'Cуп',
      mass: '250г',
      quantity: 2,
      price: 2.50,
    },
    {
      name: 'Cуп',
      mass: '250г',
      quantity: 2,
      price: 2.50,
    },
    {
      name: 'Cуп',
      mass: '250г',
      quantity: 2,
      price: 2.50,
    },
    {
      name: 'Cуп',
      mass: '250г',
      quantity: 2,
      price: 2.50,
    },
    {
      name: 'Стейк',
      mass: '100г',
      quantity: 1,
      price: 2.00,
    },
    {
      name: 'Cуп',
      mass: '250г',
      quantity: 2,
      price: 2.50,
    },
    {
      name: 'Стейк',
      mass: '100г',
      quantity: 1,
      price: 2.00,
    },
  ],
  menu: 'food',
};

let card = new Card(props);
card.render(document.getElementById('card-test'));
