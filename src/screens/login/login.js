import './login.css';
import loginContent from './login.hbs';

export default class LoginScreen {
  constructor() {}

  render(target, props) {
    const context = { email: props.email, show: props.visibility };
    target.innerHTML = loginContent(context);
    target.querySelector('#login__content').addEventListener('submit', (event) => { this.logIn(event, target); });
  }

  logIn(event, target) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const _email = formData.get('email');
    const _password = formData.get('password');
    fetch('/api/account/logon', {
      method: 'POST',
      body: { email: _email, password: _password },
    }).then((res) => {
      res.json();
    }).then((data) => {
      document.cookie = `token = ${data.token};`;
      const username = data.username;
      const type = data.type;
    }).catch((err) => {
      this.render(target, { visibility: 'visible', email: _email });
    });
  }
}

