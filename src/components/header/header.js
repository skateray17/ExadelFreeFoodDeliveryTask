import './header.css';
// import Handlebars from 'handlebars';
import template from './header.hbs';
import * as utils from '../../common/utils.js';

export default class Header{

  constructor(){

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
    let header = utils.createElementsFromString(template(headersProps))[0];
    return target.appendChild(header);
    }

}