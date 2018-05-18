import './makeOrderTable.css';
import template from './makeOrderTable.hbs';
import { createElementsFromString } from '../../../../common/utils';

export default class MakeOrderTable {
  render(target, props) {
    return target.appendChild(createElementsFromString(template(props)));
  }
}
