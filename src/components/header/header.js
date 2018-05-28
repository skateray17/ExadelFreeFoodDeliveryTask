import './header.css';
import usersHeader from './usersHeader.hbs';
import managersHeader from './managersHeader.hbs';
import { eventBus } from '../../common/eventBus';
import { createElementsFromString, replaceFirstChild, roles } from '../../common/utils';
import { getUserInfo } from '../../common/userService';
import { logout } from '../../common/loginService';
import { getBalance } from '../../common/balanceService';

export default class Header {
  render(target, props) {
    let header,
      curUser,
      type,
      curBalance;
    getUserInfo().then((user) => {
      curUser = user;
      type = curUser.type;
    }).then(() => {
      getBalance().then((balance) => {
        curBalance = balance;

        if (props.page === 'manager') {
          header = createElementsFromString(managersHeader());
        }
        if (props.page === 'user') {
          const headersProps = {
            isUserManager: false,
            nickname: curUser.username,
            balance: curBalance,
          };
          if (type === +roles.manager) {
            headersProps.isUserManager = true;
          }
          header = createElementsFromString(usersHeader(headersProps));
        }
        if (target.firstChild.tagName === 'HEADER') {
          replaceFirstChild(target, header);
        } else {
          target.insertBefore(header, target.firstChild);
        }

        if (type === +roles.manager) {
          header.querySelector('.header-content__switch-mode-button').addEventListener('click', () => {
            switchMode(props);
          });
        }
        header.querySelector('.exit-ico').addEventListener('click', () => {
          logout(props.router);
        });

        return header;
      });
    });
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

function switchLanguage(props) {
  const language = localStorage.getItem('language');
  if (language === 'ru') {
    localStorage.setItem('language', 'en');
  } else {
    localStorage.setItem('language', 'ru');
  }
  window.location.reload();
}
