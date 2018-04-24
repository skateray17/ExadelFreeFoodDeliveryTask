import header from './header.hbs';
import './header.css';

export default class CardHeader {

  render(target, props) {
    let context = {
      weekday: props.weekday,
      date: props.date,
      headerStyle: props.headerStyle,
    };

    let headerTemplate = header(context);
    target.innerHTML = headerTemplate;
  }
}