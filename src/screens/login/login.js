import './login.css';
import loginContent from './login.hbs';
import Spinner from '../../components/spinner/spinner';
import { getUserInfo } from '../../common/user.service';
import { checkType, removeCookie, setCookie } from '../../common/utils';
import { login } from '../../common/login.service';

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
    const email = formData.get('email');
    const password = formData.get('password');

    Spinner.show(target.querySelector('.login__content'));
    login(email, password).then((res) => {
      if (!res.ok) {
        return Promise.reject();
      }
      return res.json();
    }).then((data) => {
      setCookie('token', data.token, 365);
      setCookie('username', data.username, 365);
      setCookie('type', data.type, 365);
      this.router.navigate(checkType(getUserInfo().type));
    }).catch(() => {
      this.render(target, { displayError: true, email });
    });
  }

  static logOut() {
    removeCookie('token');
    removeCookie('username');
    removeCookie('type');
    this.router.navigate('login');
  }
}
