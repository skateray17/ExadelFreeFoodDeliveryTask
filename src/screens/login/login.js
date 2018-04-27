import './login.css';
import loginContent from './login.hbs';
import { tempUser } from '../../common/user.service';

export default class LoginScreen {
  constructor(router) {
    this.router = router;
  }

  render(target, props) {
    let showProp;
    if (props.displayError) {
      showProp = 'visible';
    } else {
      showProp = 'hidden';
    }
    const context = { email: props.email, show: showProp };
    target.innerHTML = loginContent(context);
    target.querySelector('.login__content').addEventListener('submit', (event) => { this.logIn(event, target); });
  }

  logIn(event, target, router) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const _email = formData.get('email');
    const _password = formData.get('password');

    if (_email === 'u@u') {
      tempUser.name = 'Alex';
      tempUser.role = 1;
      tempUser.balance = 20;
      document.cookie = 'token = u@u;';
      this.router.navigate('main');
      return;
    }
    if (_email === 'm@m') {
      tempUser.name = 'Margo';
      tempUser.role = 10;
      tempUser.balance = 0;
      document.cookie = 'token = m@m;';
      this.router.navigate('admin');
    } else {
      this.render(target, { displayError: true, email: _email });
    }

    /*
    fetch('/api/account/logon', {
      method: 'POST',
      body: { email: _email, password: _password },
    }).then((res) => {
      res.json();
    }).then((data) => {
      document.cookie = `token = ${data.token};`;
    }).catch((err) => {
      this.render(target, { displayError: true, email: _email });
    });
    */
  }
}

