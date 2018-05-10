import './index.css';
import UsersScreen from './screens/user/user';
import ManagersScreen from './screens/manager/manager';
import Router from './router';
import { routes } from './config';

const usersScreen = new UsersScreen();
const managersScreen = new ManagersScreen();

const props = {
  page: 'manager',
  userRole: 'manager',
  nickname: 'И. Фамилия',
  balance: '-30',
};

const target = document.querySelector('#screen');

//usersScreen.render(target, props);
/*usersScreen.update({
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
const router = new Router(routes, document.getElementById('screen'));
