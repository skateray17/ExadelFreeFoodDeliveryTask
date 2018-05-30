import template from './todayOrdersInner.hbs';
import { createElementsFromString } from '../../../../common/utils';

export default class {
  render(target, props) {
    props.forEach((el)=>{
      el.username = el.username.split('@')[0];
    })
    const elem = createElementsFromString(template(props));
    target.appendChild(elem);
    return elem;
  }
}
