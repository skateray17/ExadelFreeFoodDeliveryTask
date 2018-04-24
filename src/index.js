import './index.css';

import UsersScreen from './screens/usersScreen/usersScreen.js';	 
let userScreen = new UsersScreen();

let props = {
  page: 'user',
  userRole: 'manager',
  nickname: 'И. Фамилия',
  balance: '-30',
};

let target = document.querySelector('#screen');

console.log(userScreen.render(target, props));