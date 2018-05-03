import './userBalanceItems.css';
import template from './userBalanceItems.hbs';
import { createElementsFromString } from '../../../../common/utils';

export default class UserBalanceItems {
  render(target, props) {
    return target.appendChild(createElementsFromString(template(props)));
  }
}
