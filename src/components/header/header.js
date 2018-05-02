import './header.css';
import usersHeader from './usersHeader.hbs';
import managersHeader from './managersHeader.hbs';
import { createElementsFromString, checkType } from '../../common/utils';
import { getUserInfo } from '../../common/user.service';

export default class Header {
  render(target, props) {
    props = {
      page: 'manager',
    };
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
      if (checkType(getUserInfo().type) === 'manager') {
        headersProps.isUserManager = true;
      }
      header = createElementsFromString(usersHeader(headersProps));
    }
    return target.appendChild(header);
  }
}
