import './error.css';
import errorContent from './error.hbs';

export default class ErrorScreen {
  constructor() {}

  render(target, props) {
    target.innerHTML = errorContent();
  }
}
