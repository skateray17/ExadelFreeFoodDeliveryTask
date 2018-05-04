import template from './empty.hbs';
import { createElementsFromString } from '../../common/utils';

export default class EmptyComponent {
  render(screenTarget) {
    const screen = createElementsFromString(template());
    screenTarget.appendChild(screen);
    return screenTarget;
  }
}