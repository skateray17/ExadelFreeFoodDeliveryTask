import './makeOrder.css';
import template from './makeOrder.hbs';
import MakeOrderHeader from './makeOrderHeader/makeOrderHeader';
import MakeOrderFooter from './makeOrderFooter/makeOrderFooter';
import MakeOrderTable from './makeOrderTable/makeOrderTable';
import MakeOrderTableFooter from './makeOrderTableFooter/makeOrderTableFooter';
import { createElementsFromString, getCookie } from '../../../common/utils';
import { get } from '../../../common/requests';
import Spinner from '../../../components/spinner/spinner';

export default class MakeOrderPage {
  printTable() {
    const printContents = document.getElementById('make-order__printableArea-table').innerHTML;
    const screen = document.getElementById('screen');
    screen.style.display = 'none';
    const newLi = document.createElement('div');
    newLi.innerHTML = printContents + document.querySelector('.make-order__table-footer').outerHTML;
    document.body.insertBefore(newLi, null);

    window.print();
    document.body.removeChild(newLi);
    screen.style.display = '';
  }

  render(target, props) {
    const makeOrderHeader = new MakeOrderHeader();
    const makeOrderFooter = new MakeOrderFooter();
    const makeOrderTable = new MakeOrderTable();
    const makeOrderTableFooter = new MakeOrderTableFooter();
    const makeOrderTableElement = target.appendChild(createElementsFromString(template()));

    makeOrderHeader.render(makeOrderTableElement, props);

    const spinner = new Spinner();
    spinner.render(document.querySelector('.content'));
    get('order/', {}, { currentDate: new Date().toISOString().replace('Z', '') })
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
      }).finally(() => {
        spinner.destroy();
      });

    return makeOrderTableElement;
  }
}
