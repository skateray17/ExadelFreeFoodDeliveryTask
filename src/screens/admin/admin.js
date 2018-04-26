import './admin.css';
import AdminContent from './admin.hbs';
import Header from '../../components/header/header';

export default class AdminHomeScreen {
  render(target, router, props) {
    const adminContent = AdminContent();
    target.innerHTML = adminContent;
    const header = new Header();
    header.render(target, props);
    return target;
  }
}
