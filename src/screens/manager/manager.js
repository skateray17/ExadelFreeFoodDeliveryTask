import './manager.css';
import template from './manager.hbs';
import Header from '../../components/header/header';
import { createElementsFromString } from '../../common/utils';
import MakeOrderTable from '../../components/managerContent/makeOrderContent/makeOrder';

export default class ManagersScreen {
  render(target, props) {
    const header = new Header();
    header.render(target, props);
    const screen = createElementsFromString(template());
    target.appendChild(screen);
    const makeOrderTable = new MakeOrderTable();
    makeOrderTable.render(document.querySelector('.content'));
    // const userBalanceTable = new UserBalanceTable();
    // userBalanceTable.render(document.querySelector('.content'));
    return screen;
  }
}
