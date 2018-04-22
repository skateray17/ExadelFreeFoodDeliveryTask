import './index.css';

import UsersScreen from './screens/usersScreen/usersScreen.js';	 
let userScreen = new UsersScreen();

let props = {
  isManagersPage: false,
  isUserManager: true,
  nickname: 'И. Фамилия',
  balance: '-20',
  // test: {body: 'test'}
};
let target = document.querySelector('#screen');

userScreen.render(target, props);