import handlebars from 'handlebars';
import { loginScreen } from './screens/loginContent/loginContent';
let html = handlebars.compile(loginScreen());

const screen = document.getElementById('screen').innerHTML;

const context = { loginScreen: handlebars.compile(loginScreen()) };
document.getElementById('main-screen').innerHTML = html(context);

console.log('html: ' + html);
console.log('context: ' + context);
console.log('document.getElementById(\'main-screen\').innerHTML: ' + document.getElementById('main-screen').innerHTML);
