import './userBalanceTable.css';
import template from './userBalanceTable.hbs';
import UserBalanceItems from './userBalanceItems/userBalanceItems';
import UserBalanceHeader from './userBalanceHeader/userBalanceHeader';
import UserBalanceFooter from './userBalanceFooter/userBalanceFooter';
import { createElementsFromString } from '../../../common/utils';
import { get } from '../../../common/requests';
import Spinner from '../../spinner/spinner';
import Toast from '../../toast/toast';

function createDelayedInputEvent(target, delay, callback) {
  let inputTimeout;
  target.oninput = (e) => {
    if (inputTimeout) {
      clearTimeout(inputTimeout);
      inputTimeout = null;
    }
    inputTimeout = setTimeout(() => { inputTimeout = null; callback(e); }, delay);
  };
}

export default class UserBalanceTable {
  render(target, props) {
    this.perPage = 10;
    this.name = '';
    this.page = 1;
    this.mayClickRight = false;
    this.userBalanceItems = new UserBalanceItems();
    this.userBalanceHeader = new UserBalanceHeader();
    this.userBalanceFooter = new UserBalanceFooter();
    const userBalanceTableElement = target.appendChild(createElementsFromString(template()));
    this.spinner = new Spinner();
    this.spinner.render(userBalanceTableElement);
    this.getData().then((data) => {
      this.spinner.destroy();
      this.userBalanceHeader.render(userBalanceTableElement, props);
      this.userBalanceItems.render(userBalanceTableElement, data);
      this.userBalanceFooter.render(userBalanceTableElement, data);
      this.createHeaderEvents();
      this.createFooterEvents();
    }).catch(() => {
      this.spinner.destroy();
      Toast.show({ title: 'Something went wrong', type: 'error', canDismiss: true });
    });
    return userBalanceTableElement;
  }

  createHeaderEvents() {
    createDelayedInputEvent(this.userBalanceHeader, 300, (e) => {
      this.name = e.target.value;
      this.page = 1;
      this.rerender();
    });
  }

  createFooterEvents() {
    this.userBalanceFooter.onNextPage = () => {
      if (this.mayClickRight) {
        this.page++;
        this.rerender();
      }
    };
    this.userBalanceFooter.onPrevPage = () => {
      if (this.page > 1) {
        this.page--;
        this.rerender();
      }
    };
    createDelayedInputEvent(this.userBalanceFooter, 300, (e) => {
      this.perPage = Number.parseInt(e.target.value, 10) || 15;
      this.page = 1;
      this.rerender();
    });
  }

  checkRight(props) {
    props.perPage = props.perPage || 15;
    this.mayClickRight = props.totalAmount > props.currentPage * props.perPage;
  }

  rerender() {
    this.getData().then((data) => {
      this.userBalanceItems.render(null, data);
      this.userBalanceFooter.render(null, data);
      this.checkRight(data);
    });
  }

  getData() {
    return get('balance/', {}, {
      perPage: this.perPage, name: this.name, page: this.page,
    })
      .then((res) => {
        if (res.ok) return res.json();
        return { result: [] };
      });
  }
}
