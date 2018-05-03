import './userBalanceFooter.css';
import template from './userBalanceFooter.hbs';
import { createElementsFromString } from '../../../../common/utils';

export default class UserBalanceFooter {
  render(target, props) {
    props = {   //example
      showedInterval: '1-10',
      totalQuantity: '500',
      selectedQuantity: '10',
    };
    return target.appendChild(createElementsFromString(template(props)));
  }
}
