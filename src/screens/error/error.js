import './error.css';
import errorContent from './error.hbs';

export default class ErrorScreen {
  render(target, router, props) {
    target.innerHTML = errorContent();
  }
}
