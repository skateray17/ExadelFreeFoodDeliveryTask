import './index.css';
import UsersScreen from './screens/user/user';
import ManagersScreen from './screens/manager/manager';

const usersScreen = new UsersScreen();
const managersScreen = new ManagersScreen();

const props = {
  page: 'manager',
  userRole: 'manager',
  nickname: 'И. Фамилия',
  balance: '-30',
};

const target = document.querySelector('#screen');

usersScreen.render(target, props);
/*
usersScreen.update({
  header: {
    weekday: 'Чт',
    date: 'Fri May 04 2018',
    active: true,
  },
  orderPrice: 10.15,
  orders: [
    {
      name: 'голубцы ленивые',
      mass: 150,
      price: 5.50,
      quantity: 3,
    },
  ],
});
*/
