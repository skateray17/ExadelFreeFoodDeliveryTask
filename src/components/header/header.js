import './header.css';
import usersHeader from './usersHeader.hbs';
import managersHeader from './managersHeader.hbs';
import { createElementsFromString, roles } from '../../common/utils';
import { getUserInfo } from '../../common/user.service';
import { logout } from '../../common/login.service';

export default class Header {
  render(target, props) {
    let header;
    if (props.page === 'manager') {
      header = createElementsFromString(managersHeader());
    }
    if (props.page === 'user') {
      const headersProps = {
        isUserManager: false,
        nickname: getUserInfo().username,
        balance: getUserInfo().balance,
      };
      if (getUserInfo().type == roles.manager) {
      if (getUserInfo().type === roles.manager) {
        headersProps.isUserManager = true;
      }
      header = createElementsFromString(usersHeader(headersProps));
    }
    const screenWithHeader = target.appendChild(header);
    if (getUserInfo().type == roles.manager) {
      target.querySelector('.header-content__switch-mode-button').addEventListener('click', () => {
        switchMode(props);
      });
    } target.querySelector('.exit-ico').addEventListener('click', () => { logout(props.router); });
    if (getUserInfo().type === roles.manager) {
      target.querySelector('.header-content__switch-mode-button').addEventListener('click', () => {
        switchMode(props);
      });
    }
    target.querySelector('.exit-ico').addEventListener('click', () => { logout(props.router); });

    return screenWithHeader;
  }
}

function switchMode(props) {
  if (props.page === 'manager') {
    props.router.navigate('main');
  }
  if (props.page === 'user') {
    props.router.navigate('manager');
  }
}
