import template from './todayOrdersInner.hbs';
import { createElementsFromString } from '../../../../common/utils';

export default class {
  render(target, props) {
    const elem = createElementsFromString(template(props));
    target.appendChild(elem);
    return elem;
  }
}
