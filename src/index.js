import handlebars from 'handlebars';
import { loginScreen } from './screens/loginContent/loginContent';

const screen = document.getElementById('loginScreen').innerHTML;
const template = handlebars.compile(screen);
const context = { loginScreen: handlebars.compile(loginScreen()) };
document.querySelector('#loginScreen').innerHTML = template(context);
