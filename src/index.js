import './index.css';
import UsersScreen from './screens/user/user.js';
import ManagersScreen from './screens/manager/manager.js';

let usersScreen = new UsersScreen();
let managersScreen = new ManagersScreen();

let props = {
  page: 'manager',
  userRole: 'manager',
  nickname: 'И. Фамилия',
  balance: '-30',
};

let target = document.querySelector('#screen');

console.log(managersScreen.render(target, props));