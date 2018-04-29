import UserBalanceItems from './userBalanceItems/userBalanceItems';
import UserBalanceHeader from './userBalanceHeader/userBalanceHeader';
import UserBalanceFooter from './userBalanceFooter/userBalanceFooter';

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

    if (!data.users.length) {
      data.users = false;
    }
    const userBalanceHeaderElement = new userBalanceHeader.render(target, props);
    const userBalanceItemsElement = userBalanceItems.render(target, data);
    const userBalanceFooterElement = userBalanceFooter.render(target, data);
    return target;
  }
}
