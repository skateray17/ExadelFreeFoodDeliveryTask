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
        const obj = {};
        res.result.forEach((item) => {
          item.dishList.forEach((dish) => {
            if (obj[dish.dishTitle] !== undefined) {
              obj[dish.dishTitle] += dish.amount;
            } else {
              obj[dish.dishTitle] = dish.amount;
            }
          });
          totalPrice += item.totalPrice;
        });
        Object.keys(obj).forEach((key) => {
          array.push({ dishTitle: key, amount: obj[key] });
        });

        totalPrice = parseFloat((totalPrice).toFixed(2));
        makeOrderTable.render(makeOrderTableElement, { items: array, totalPrice });
        makeOrderTableFooter.render(makeOrderTableElement, { totalPrice });
        makeOrderFooter.render(makeOrderTableElement, props);
      }).finally(() => {
        spinner.destroy();
      });

    return makeOrderTableElement;
  }
}
