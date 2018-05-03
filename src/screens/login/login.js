import './login.css';
import loginContent from './login.hbs';
import { getUserInfo } from '../../common/user.service';
import { checkType } from '../../common/utils';
import { setCookie } from '../../common/utils';

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
    return loginContent(context);
  }

  logIn(event, target) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const _email = formData.get('email');
    const _password = formData.get('password');

    fetch('http://localhost:3000/api/account/login', {
      method: 'POST',
      body: JSON.stringify({ email: _email, password: _password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject();
      }
      return res.json();
    })
      .then((data) => {
        setCookie('token', data.token, 365);
        setCookie('username', data.username, 365);
        setCookie('type', data.type, 365);
        this.router.navigate(checkType(getUserInfo().type));
      }).catch(() => {
        this.render(target, { displayError: true, email: _email });
      });
  }
}