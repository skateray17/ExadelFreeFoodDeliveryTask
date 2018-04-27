import './header.css';
import usersHeader from './usersHeader.hbs';
import managersHeader from './managersHeader.hbs';
import { createElementsFromString } from '../../common/utils';

export default class Header {
  render(target, props) {
    props = {
      page: 'manager',
      userRole: 'manager',
      nickname: 'И. Фамилия',
      balance: '-30',
    };
    let header;
    if (props.page === 'manager') {
      header = createElementsFromString(managersHeader());
    }
    if (props.page === 'user') {
      const headersProps = {
        isUserManager: false,
        nickname: props.nickname,
        balance: props.balance,
      };
      if (props.userRole === 'manager') {
        headersProps.isUserManager = true;
      }
      header = createElementsFromString(usersHeader(headersProps));
    }
    return target.appendChild(header);
  }
}
