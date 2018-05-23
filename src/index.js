import './index.css';
import Router from './router';
import { routes } from './config';

/*
usersScreen.render(target, props);
usersScreen.update({
  id: 1525986000000,
  header: {
    active: 'true',
    date: 'Fri May 11 2018',
    weekday: 'Пт',
  },
  orders: [
  ],
  orderPrice: 6.4,
});

*/
console.log(process.env.DB_HOST);
const router = new Router(routes, document.getElementById('screen'));
