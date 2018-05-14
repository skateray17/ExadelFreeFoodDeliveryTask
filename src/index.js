import './index.css';
import UsersScreen from './screens/user/user';
import ManagersScreen from './screens/manager/manager';
import Router from './router';
import { routes } from './config';

const router = new Router(routes, document.getElementById('screen'));
