import './makeOrder.css';
import template from './makeOrder.hbs';
// import UserBalanceItems from './userBalanceItems/userBalanceItems';
import MakeOrderHeader from './makeOrderHeader/makeOrderHeader';
import MakeOrderFooter from './makeOrderFooter/makeOrderFooter';
import MakeOrderTable from './makeOrderTable/makeOrderTable';
import MakeOrderTableFooter from './makeOrderTableFooter/makeOrderTableFooter';
/* import UserBalanceFooter from './userBalanceFooter/userBalanceFooter'; */
import { createElementsFromString } from '../../../common/utils';


export default class UserBalanceTable {
  render(target, props) {
    // const userBalanceItems = new UserBalanceItems();
    const makeOrderHeader = new MakeOrderHeader();
    const makeOrderFooter = new MakeOrderFooter();
    const makeOrderTable = new MakeOrderTable();
    const makeOrderTableFooter = new MakeOrderTableFooter();
    // const userBalanceFooter = new UserBalanceFooter();
    const userBalanceTableElement = target.appendChild(createElementsFromString(template()));
    fetch('/api/order/', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        username: 'karpovich', dishList: [{ dishTitle: 'тарелка для супа', amount: 323 }, { dishTitle: 'голубцы ленивые', amount: 1 }], totalPrice: 61.35, date: '2018-05-06T21:00:00.000Z',
      },
    }).then();

    // if (!data.users.length) {
    //   data.users = false;
    // }
    const arr = { items: [{ dishTitle: 'тарелка для супа', amount: 323 }, { dishTitle: 'супец', amount: 23 }] };
    makeOrderHeader.render(userBalanceTableElement, props);
    makeOrderTable.render(userBalanceTableElement, arr);
    makeOrderTableFooter.render(userBalanceTableElement, props);
    makeOrderFooter.render(userBalanceTableElement, props);
    // const userBalanceItemsElement = userBalanceItems.render(userBalanceTableElement, data);
    // const userBalanceFooterElement = userBalanceFooter.render(userBalanceTableElement, data);
    return userBalanceTableElement;
  }
}
