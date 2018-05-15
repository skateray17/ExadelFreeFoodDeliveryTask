import './spinner.css';
import spinnerContent from './spinner.hbs';
import { createElementsFromString } from '../../common/utils';

export default class Spinner {
  static show(target) {
    const spinner = spinnerContent();
    target.appendChild(createElementsFromString(spinner));
    return spinner;
  }

  static hide(target) {
    target.removeChild(target.querySelector('.spinner__container'));
  }
}
