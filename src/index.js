import './index.css';
import ManagerHomeScreen from './screens/manager/manager';

const screen = new ManagerHomeScreen();
const props = {
  page: 'manager',
  userRole: 'manager',
};
const target = document.getElementById('screen');
screen.render(target, props);
