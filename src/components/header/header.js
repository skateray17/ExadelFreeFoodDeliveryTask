import './header.css';
// import Handlebars from 'handlebars';
import usersHeader from './usersHeader.hbs';
import managersHeader from './managersHeader.hbs';
import { createElementsFromString } from '../../common/utils.js';

export default class Header{

  constructor(){

  }

  render(target, props){

    let header;
    if (props.page === 'manager'){
      header = createElementsFromString(managersHeader())[0];
    }
    if (props.page === 'user'){
      let headersProps = {
      isUserManager: false,
      nickname: props.nickname,
      balance: props.balance
      };
      if (props.userRole === 'manager'){
        headersProps.isUserManager = true;
      }
      header = createElementsFromString(usersHeader(headersProps))[0];
    }
    return target.appendChild(header);

    }

}