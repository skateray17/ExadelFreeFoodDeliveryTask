import './header.css';
import usersHeader from './usersHeader.hbs';
import managersHeader from './managersHeader.hbs';
import { eventBus } from '../../common/eventBus';
import {createElementsFromString, replaceFirstChild, roles, setCookie} from '../../common/utils';
import { getUserInfo } from '../../common/user.service';
import { logout } from '../../common/login.service';

export default class Header {
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
    if (target.firstChild) {
      replaceFirstChild(target, header);
    } else {
      target.appendChild(header);
    }
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

    this.unsubscribe = eventBus.subscribe('onBalanceChange', this.onBalanceChange.bind(this, target, props));

    return header;
  }

  onBalanceChange(target, props, balance) {
    setCookie('balance', balance, 365);
    this.render(target, props);
  }

  destroy() {
    this.unsubscribe();
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
