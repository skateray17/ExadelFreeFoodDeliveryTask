import './popup.css';
import popup from './popup.hbs';
import { createElementsFromString } from '../../common/utils';

function close() {
  const popupEl = document.querySelector('.popup');
  popupEl.removeEventListener('click', backClick);
  document.querySelector('body').removeChild(popupEl);
}
function backClick(event) {
  const popupEl = document.querySelector('.popup');
  if (event.target === popupEl) {
    close();
  }
}

export default class Popup {
  static show(props) {
    const popupHTML = createElementsFromString(popup());
    document.querySelector('body').appendChild(popupHTML);
    const popupEl = document.querySelector('.popup');
    const elem = new props.elem(popupEl, props);
    elem.render(popupEl, props);
    popupEl.addEventListener('click', backClick);
    return close;
  }
}
