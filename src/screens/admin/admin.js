import './admin.css';
import AdminContent from './admin.hbs';
import Header from '../../components/header/header';

export default class AdminHomeScreen {
  constructor(router) {
    this.router = router;
  }

  render(target, props) {
    const adminContent = AdminContent();
    target.innerHTML = adminContent;
    const header = new Header();
    header.render(target, props);
    return target;
  }
}
