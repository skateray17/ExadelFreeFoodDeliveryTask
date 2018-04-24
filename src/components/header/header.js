import './header.css';
import template from './header.hbs';

export default class Header {
  constructor() {
  }

  render(target, props){
    let headersProps = {
        isManagersPage: false,
        isUserManager: false,
        isUserOnUsersPage: false,
        nickname: props.nickname,
        balance: props.balance
    };
    if (props.userRole === 'manager'){
      headersProps.isUserManager = true;
    }
    if (props.page === 'manager'){
      headersProps.isManagersPage = true;
    }
    if (props.page === 'user' && props.userRole === 'user'){
      headersProps.isUserOnUsersPage = true;
    }
    let header = document.createElement('header');
    header.classList.add('shadow');
    header.innerHTML = template(headersProps);
    let nextSibling = target.firstChild;
    target.insertBefore(header, nextSibling);
    return header;
    }
}