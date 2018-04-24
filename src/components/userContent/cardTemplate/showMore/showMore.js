import './showMore.css';
import showMore from './showMore.hbs';

export default class ShowMore {
  render(target, props) {
    let field = document.createElement('div');
    field.innerHTML = showMore(props);
    target.insertAdjacentElement('afterbegin', field);
  }
}