import './userBalanceHeader.css';
import template from './userBalanceHeader.hbs';
import { createElementsFromString } from '../../../../common/utils';

export default class UserBalanceHeader {
  render(target, props) {
    return target.appendChild(createElementsFromString(template(props)));
  }
}
