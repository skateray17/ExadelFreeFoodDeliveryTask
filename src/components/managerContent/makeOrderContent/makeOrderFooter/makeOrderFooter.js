import './makeOrderFooter.css';
import template from './makeOrderFooter.hbs';
import { createElementsFromString, getCookie } from '../../../../common/utils';
import { put } from '../../../../common/requests';

export default class makeOrderFooter {
  render(target, props) {
    const element = target.appendChild(createElementsFromString(template(props)));
    element.querySelector('.make-order_print-button').addEventListener('click', () => {
      const printContents = document.getElementById('make-order__printableArea-table').innerHTML;
      const screen = document.getElementById('screen');
      screen.style.display = 'none';
      const newLi = document.createElement('div');
      newLi.innerHTML = printContents + document.querySelector('.make-order__table-footer').outerHTML;
      document.body.insertBefore(newLi, null);

      window.print();
      document.body.removeChild(newLi);
      screen.style.display = '';
    });
    element.querySelector('.make-order_submit-button').addEventListener('click', () => {
      put('adminOrder/', { 'Content-Type': 'application/json', Authorization: getCookie('token') }).then((res) => { console.log(`status: ${res.status}`); });;
      // fetch('https://fooddel123.herokuapp.com/api/adminOrder/', {
      //   method: 'put',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // }).then((res) => { console.log(`status: ${res.status}`); });
    });
    return element;
  }
}

