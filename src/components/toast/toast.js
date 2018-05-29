import './toast.css';
import toastContent from './toast.hbs';
import { createElementsFromString } from '../../common/utils';
import { typeOfToast } from '../../common/constants';

export default class Toast {
  /**
     *
     * @param props = { title:, type:, canDismiss:, timeout: }
     * @returns {Element | null}
     */
  static show(props) {
    const context = { title: props.title };
    document.body.appendChild(createElementsFromString(toastContent(context)));
    const toast = document.querySelector('.snackbar__container:last-child');
    const dismissButton = toast.querySelector('.dismiss__button');
    const showClassName = 'show';

    // fix animation
    setImmediate(() => { toast.classList.add(showClassName); });

    toast.querySelector('#snackbar').style.backgroundColor = typeOfToast[props.type];
    const time = props.timeout || 3000;
    if (props.canDismiss) {
      dismissButton.classList.add(showClassName);
      dismissButton.addEventListener('click', (event) => {
        const target = event.target.closest('.snackbar__container');
        removeToast(target);
      });
    } else {
      dismissButton.classList.remove(showClassName);
    }
    setTimeout(() => {
      removeToast(toast);
    }, time);
    return toast;
  }
}

function removeToast(target) {
  target.classList.remove('show');
  setTimeout(() => { target.remove(); }, 500);
}
