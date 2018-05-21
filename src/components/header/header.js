import './header.css';
import usersHeader from './usersHeader.hbs';
import managersHeader from './managersHeader.hbs';
import eventBus from '../../common/eventBus';
import { createElementsFromString, roles } from '../../common/utils';
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
    const screenWithHeader = target.appendChild(header);
    if (type === roles.manager) {
      target.querySelector('.header-content__switch-mode-button').addEventListener('click', () => {
        switchMode(props);
      });
    }
    target.querySelector('.exit-ico').addEventListener('click', () => {
      logout(props.router);
    });

    // to remove
    if (type === roles.user) {
      target.querySelector('.history-ico').addEventListener('click', () => {
        eventBus.publish('onBalanceChange', 20);
      });
    }
    //

    eventBus.subscribe('onBalanceChange', this.updateBalance);

    return screenWithHeader;
  }

  updateBalance(balance) {
    console.log(balance);
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
