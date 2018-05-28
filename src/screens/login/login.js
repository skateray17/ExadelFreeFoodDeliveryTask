import './login.css';
import loginContent from './login.hbs';
import Spinner from '../../components/spinner/spinner';
import { getUserInfo } from '../../common/userService';
import { checkType } from '../../common/utils';
import { login } from '../../common/loginService';

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

    const spinner = new Spinner();
    spinner.render(target.querySelector('.login__content'));
    login(email, password).then(() => {
      let type;
      getUserInfo().then((curUser) => {
        type = curUser.type;
        this.router.navigate(checkType(type));
      });
    }).catch(() => {
      this.render(target, { displayError: true, email });
    })
      .finally(() => {
        spinner.destroy();
      });
  }
}
