import handlebars from 'handlebars';
import { loginScreen } from './screens/loginContent/loginContent';

//const screen = document.getElementById('screen').innerHTML;
const template = handlebars.compile(loginScreen());
const context = { loginScreen: handlebars.compile(loginScreen()) };
document.getElementById('main-screen').innerHTML = template(context);
