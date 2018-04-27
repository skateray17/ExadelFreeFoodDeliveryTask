import header from './header.hbs';
import './header.css';
import { createElementsFromString } from '../../../../../src/common/utils';

export default class CardHeader {

  render(target, props) {
    let context = {
      weekday: props.weekday,
      date: props.date,
      headerStyle: props.headerStyle,
    };

    let headerTemplate = header(context);
    target.appendChild(createElementsFromString(headerTemplate));
  }
}