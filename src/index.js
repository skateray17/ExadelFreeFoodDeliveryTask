import './index.css';
import Router from './router';
import { routes } from './config';

// console.log(process.env.DB_HOST);
const router = new Router(routes, document.getElementById('screen'));
