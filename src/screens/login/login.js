import './login.css';
import loginContent from './login.hbs';

export default class LoginScreen {
  render(target, router, props) {
    let showProp;
    if (props.displayError) {
      showProp = 'visible';
    } else {
      showProp = 'hidden';
    }
    const context = { email: props.email, show: showProp };
    target.innerHTML = loginContent(context);
    target.querySelector('.login__content').addEventListener('submit', (event) => { this.logIn(event, target, router); });
  }

  logIn(event, target, router) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const _email = formData.get('email');
    const _password = formData.get('password');

    if (_email === 'u@u') {
      router.navigate('main');
    }
    if (_email === 'm@m') {
      router.navigate('admin');
    } else {
      this.render(target, router, { displayError: true, email: _email });
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

