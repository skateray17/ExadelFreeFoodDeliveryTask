import './makeOrder.css';
import template from './makeOrder.hbs';
import MakeOrderHeader from './makeOrderHeader/makeOrderHeader';
import MakeOrderFooter from './makeOrderFooter/makeOrderFooter';
import MakeOrderTable from './makeOrderTable/makeOrderTable';
import MakeOrderTableFooter from './makeOrderTableFooter/makeOrderTableFooter';
import { createElementsFromString, getCookie } from '../../../common/utils';
import { get } from '../../../common/requests';


export default class UserBalanceTable {
  render(target, props) {
    const makeOrderHeader = new MakeOrderHeader();
    const makeOrderFooter = new MakeOrderFooter();
    const makeOrderTable = new MakeOrderTable();
    const makeOrderTableFooter = new MakeOrderTableFooter();
    const makeOrderTableElement = target.appendChild(createElementsFromString(template()));

    makeOrderHeader.render(makeOrderTableElement, props);

    get('order/', { 'Content-Type': 'application/json', Authorization: getCookie('token') })
      .then(response => response.json())
      .then((res) => {
        const array = [];
        let totalPrice = 0;
        res.result.forEach((item) => {
          item.dishList.forEach((dish) => {
            if (array.includes(a => dish.dishTitle === a.dishTitle)) {
              const index = array.find(a => dish.dishTitle === a.dishTitle);
              array[index].amount += dish.amount;
            } else {
              array.push(dish);
            }
          });
          totalPrice += item.totalPrice;
        });


        makeOrderTable.render(makeOrderTableElement, { items: array, totalPrice });
        makeOrderTableFooter.render(makeOrderTableElement, { totalPrice });
        makeOrderFooter.render(makeOrderTableElement, props);
      });

    return makeOrderTableElement;
  }
}
