import './login.css';
import loginContent from './login.hbs';

export default class LoginScreen {
  constructor(parent, email, password) {
    this.parent = parent;
    this.email = email;
    this.password = password;
  }

  render(parent, visibility) {
    const context = { email: this.email, password: this.password, show: visibility };
    parent.innerHTML = loginContent(context);
    parent.querySelector('#login__content').addEventListener('submit', (event) => { this.logOn(event); });
  }

  logOn(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    this.email = formData.get('email');
    this.password = formData.get('password');
    fetch('/api/account/logon', {
      method: 'POST',
      body: { email: this.email, password: this.password },
    }).then((res) => {
      alert('there will be user o manager screen');
    }).catch((err) => {
      this.render(this.parent, 'visible');
    });
  }
}

