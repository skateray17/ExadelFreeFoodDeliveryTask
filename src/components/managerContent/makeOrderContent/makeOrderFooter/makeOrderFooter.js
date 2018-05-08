import './makeOrderFooter.css';
import template from './makeOrderFooter.hbs';
import { createElementsFromString } from '../../../../common/utils';

export default class makeOrderHeader {
  render(target, props) {
    return target.appendChild(createElementsFromString(template(props)));
  }
}
