import './userBalanceTable.css';
import template from './userBalanceTable.hbs';
import UserBalanceItems from './userBalanceItems/userBalanceItems';
import UserBalanceHeader from './userBalanceHeader/userBalanceHeader';
import UserBalanceFooter from './userBalanceFooter/userBalanceFooter';
import { createElementsFromString } from '../../../common/utils';

const data = {    //example
  users:[
    {
      'username': 'nikita007',
      'firstName': 'Никита',
      'lastName': 'Винтукович',
      'balance': -10, 
    },
    {
      'username': 'nikita008',
      'firstName': 'Никита',
      'lastName': 'Винтукович',
      'balance': -20,
    },
    {
      'username': 'nikita009',
      'firstName': 'Никита',
      'lastName': 'Винтукович',
      'balance': -30,
    },
    {
      'username': 'nikita010',
      'firstName': 'Никита',
      'lastName': 'Винтукович',
      'balance': -40,
    },
    {
      'username': 'nikita009',
      'firstName': 'Никита',
      'lastName': 'Винтукович',
      'balance': -30,
    },
    {
      'username': 'nikita010',
      'firstName': 'Никита',
      'lastName': 'Винтукович',
      'balance': -40,
    },
    {
      'username': 'nikita009',
      'firstName': 'Никита',
      'lastName': 'Винтукович',
      'balance': -30,
    },
    {
      'username': 'nikita010',
      'firstName': 'Никита',
      'lastName': 'Винтукович',
      'balance': -40,
    },
    {
      'username': 'nikita009',
      'firstName': 'Никита',
      'lastName': 'Винтукович',
      'balance': -30,
    },
    {
      'username': 'nikita010',
      'firstName': 'Никита',
      'lastName': 'Винтукович',
      'balance': -40,
    },    
  ],
};

export default class UserBalanceTable {
  render(target, props) {
    const userBalanceItems = new UserBalanceItems();
    const userBalanceHeader = new UserBalanceHeader();
    const userBalanceFooter = new UserBalanceFooter();
    const userBalanceTableElement = target.appendChild(createElementsFromString(template()));

    if (!data.users.length) {
      data.users = false;
    }
    const userBalanceHeaderElement = userBalanceHeader.render(userBalanceTableElement, props);
    const userBalanceItemsElement = userBalanceItems.render(userBalanceTableElement, data);
    const userBalanceFooterElement = userBalanceFooter.render(userBalanceTableElement, data);
    return userBalanceTableElement;
  }
}
