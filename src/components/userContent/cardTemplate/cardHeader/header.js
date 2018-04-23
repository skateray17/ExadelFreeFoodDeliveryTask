import header from './header.hbs';
import './header.css';

export default class CardHeader {
  constructor(props) {
    this.props = props;
  }

  render(parent) {
    let context = {
      weekday: this.props.weekday,
      date: this.props.date,
      headerStyle: this.props.headerStyle,
    };

    let headerTemplate = header(context);
    parent.innerHTML = headerTemplate;

  }
}