import { square } from './loginContent.js';

const h1 = document.createElement('h1');
h1.innerText = square(5);
document.querySelector('body').appendChild(h1);