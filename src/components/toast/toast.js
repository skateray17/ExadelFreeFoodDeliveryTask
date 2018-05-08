import './toast.css';
import toastContent from './toast.hbs';
import { createElementsFromString } from '../../common/utils';

export default class Toast {
  static show(title) {
    const context = { title };
    document.body.appendChild(createElementsFromString(toastContent(context)));
    const toast = document.querySelector('#snackbar');
    toast.className = 'show';
    setTimeout(() => {
      document.querySelectorAll('.snackbar__container').forEach((a) => {
        a.remove();
      });
    }, 3000);
    return toast;
  }
}
