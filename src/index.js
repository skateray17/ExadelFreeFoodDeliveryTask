import './index.css';
import ManagersScreen from './screens/manager/manager';

//it will be removed before merge in master

const managersScreen = new ManagersScreen();  
const props = {
  page: 'manager',
  userRole: 'manager',
  nickname: 'И. Фамилия',
  balance: '-30',
};

const target = document.querySelector('#screen');

managersScreen.render(target, props);
// import Router from './router';
// import { routes } from './config';

// const router = new Router(routes, document.getElementById('screen'));
