import './manager.css';
import template from './manager.hbs';
import Header from '../../components/header/header';
import Menu from '../../components/managerContent/menuContent/menuTable/table';
import UserBalanceTable from '../../components/managerContent/userBalanceTable/userBalanceTable';
import { createElementsFromString } from '../../common/utils';

function selectTab(tab) {
  const currentTab = document.querySelector('.nav-bar-selected');
  if (currentTab) currentTab.classList.remove('nav-bar-selected');
  tab.classList.add('nav-bar-selected');
}
function renderMenu(target) {
  const menu = new Menu();
  target.innerHTML = '';
  menu.render(target);
  selectTab(document.querySelector('.upload-menu-tab'));
  return target;
}
function renderBalance(target) {
  target.innerHTML = '';
  const userBalanceTable = new UserBalanceTable();
  userBalanceTable.render(document.querySelector('.content'));
  selectTab(document.querySelector('.balance-tab'));
}
const managerTabSelector = {
  uploadMenu: (target) => {
    renderMenu(target);
  },
  balance: (target) => {
    renderBalance(target);
  },
};
function managerListeners() {
  document.querySelector('.upload-menu-tab').addEventListener('click', () => {
    managerTabSelector.uploadMenu(document.querySelector('.manager-content'));
  });
  document.querySelector('.balance-tab').addEventListener('click', () => {
    managerTabSelector.balance(document.querySelector('.manager-content'));
  });
}
export default class ManagerHomeScreen {
  render(screenTarget, props) {
    const header = new Header();
    header.render(screenTarget, props);
    const screen = createElementsFromString(template());
    screenTarget.appendChild(screen);
    const contentTarget = document.querySelector('.manager-content');
    managerTabSelector.uploadMenu(contentTarget);
    managerListeners();
    return screenTarget;
  }
}
