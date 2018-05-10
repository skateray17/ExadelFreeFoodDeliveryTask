import './toast.css';
import toastContent from './toast.hbs';
import { createElementsFromString } from '../../common/utils';
import { typeOfToast } from '../../common/constants';

export default class Toast {
  static show(props) {
    const context = { title: props.title };
    document.body.appendChild(createElementsFromString(toastContent(context)));
    const toast = document.querySelector('#snackbar');
    const dismissButton = document.querySelector('.dismiss__button');
    toast.className = 'show';
    toast.style.backgroundColor = typeOfToast[props.type];
    const time = props.timeout || 3000;
    toast.style.animationDelay = `${(time - 500) / 1000}s`;
    if (props.canDismiss) {
      dismissButton.classList.add('show');
      dismissButton.addEventListener('click', () => { removeToast(); });
    } else {
      dismissButton.className.replace('show', '');
    }
    setTimeout(() => {
      removeToast();
    }, time);
    return toast;
  }
}

function removeToast() {
  document.querySelectorAll('.snackbar__container').forEach((a) => {
    a.remove();
  });
}
