import './index.css';
import Router from './router';
import { routes } from './config';

const router = new Router(routes, document.getElementById('screen'));