import './popup.css';
import popup from './popup.hbs';
import { createElementsFromString } from '../../common/utils';
import i18n from "../../common/i18n";

function close() {
  const popupEl = document.querySelector('.popup');
  popupEl.removeEventListener('click', backClick);
  document.querySelector('body').removeChild(popupEl);
  document.querySelector('body').classList.remove('hasPopUp');
}
function backClick(event) {
  const popupEl = document.querySelector('.popup');
  if (event.target === popupEl) {
    close();
  }
}

export default class Popup {
  render(target, props) {
    this.target = target;
    const content = {
      text: props,
    }
    const pop = popup(content);
    target.appendChild(createElementsFromString(pop));
    document.querySelector('body').classList.add('hasPopUp');
    const PopUp = target.querySelector('.popup');
    if (PopUp) {
      PopUp.addEventListener('click', (e) => {
        const elem = e.target.className;
        if (elem === 'popup_content_buttons_disagree' || elem === 'popup_content_close' || elem === 'popup') {
          this.close();
        }
      });
    }
    return pop;
  }
  close() {
    close();
  }
  static show(props) {
    const popupHTML = createElementsFromString(popup());
    document.querySelector('body').classList.add('hasPopUp');
    document.querySelector('body').appendChild(popupHTML);
    const popupEl = document.querySelector('.popup');
    const elem = new props.elem(popupEl, props);
    elem.render(popupEl, props);
    popupEl.addEventListener('click', backClick);
    return close;
  }
}
