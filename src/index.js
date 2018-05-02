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

// managersScreen.render(target, props);
usersScreen.render(target, props);
