import './error.css';
import errorContent from './error.hbs';

export default class ErrorScreen {
  constructor(router) {
    this.router = router;
  }

  render(target, props) {
    target.innerHTML = errorContent();
    target.querySelector('.return__button').addEventListener('click', () => { this.router.navigate('main'); });
    return errorContent();
  }
}
