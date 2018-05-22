import './header.css';
import usersHeader from './usersHeader.hbs';
import managersHeader from './managersHeader.hbs';
import { eventBus } from '../../common/eventBus';
import { createElementsFromString, replaceFirstChild, roles } from '../../common/utils';
import { getUserInfo } from '../../common/userService';
import { logout } from '../../common/loginService';
import { onBalanceChange } from '../../common/balanceService';
import { onCookieUpdate } from '../../common/cookieService';

export default class Header {
  constructor() {
    this.unsubscribers = [];
  }

  render(target, props) {
    let header;
    const type = getUserInfo().type;
    if (props.page === 'manager') {
      header = createElementsFromString(managersHeader());
    }
    if (props.page === 'user') {
      const headersProps = {
        isUserManager: false,
        nickname: getUserInfo().username,
        balance: getUserInfo().balance,
      };
      if (type === roles.manager) {
        headersProps.isUserManager = true;
      }
      header = createElementsFromString(usersHeader(headersProps));
    }
    replaceFirstChild(target, header);
    if (type === roles.manager) {
      header.querySelector('.header-content__switch-mode-button').addEventListener('click', () => {
        switchMode(props);
      });
    }
    header.querySelector('.exit-ico').addEventListener('click', () => {
      logout(props.router);
    });

    // to remove
    if (props.page === 'user') {
      header.querySelector('.history-ico').addEventListener('click', () => {
        eventBus.publish('onBalanceChange', 260);
      });
    }
    //

    this.unsubscribers.push(eventBus.subscribe('onBalanceChange', onBalanceChange.bind(this, target, props)));
    this.unsubscribers.push(eventBus.subscribe('onCookieUpdate', onCookieUpdate));

    return header;
  }

  destroy() {
    this.unsubscribers.forEach(unsubscribe => unsubscribe());
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
