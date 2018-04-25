import './index.css';
import LoginScreen from './screens/login/login';
import Router from './router';
import { routes } from './config';

const router = new Router(routes, document.getElementById('screen'));

