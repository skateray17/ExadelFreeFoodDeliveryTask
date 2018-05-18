import './spinner.css';
import spinnerContent from './spinner.hbs';
import { createElementsFromString } from '../../common/utils';

export default class Spinner {
  render(target) {
    this.target = target;
    const spinner = spinnerContent();
    target.appendChild(createElementsFromString(spinner));
    return spinner;
  }

  destroy() {
    const containerName = '.spinner__container';
    if (this.target && this.target.querySelector(containerName)) {
      this.target.removeChild(this.target.querySelector(containerName));
    }
  }
}
