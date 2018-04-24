import './index.css';
import AdminHomeScreen from './screens/admin/admin';

const admin = new AdminHomeScreen();

let props = {
  page: 'managerScreen',
  userRole: 'manager',
  nickname: 'И. Фамилия',
  balance: '-30',
};

let target = document.getElementById('screen');

admin.render(target, props);