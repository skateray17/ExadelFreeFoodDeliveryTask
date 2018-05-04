import './manager.css';
import template from './manager.hbs';
import Header from '../../components/header/header';
import Menu from '../../components/managerContent/menuContent/menuTable/table';
import UserBalanceTable from '../../components/managerContent/userBalanceTable/userBalanceTable';
import { createElementsFromString } from '../../common/utils';
import EmptyComponent from '../../components/emptyComponent/empty';

const tabs = [
  {
    component: new Menu(),
    title: 'Upload menu',
    icon: '&#xE561;',
  },
  {
    component: new EmptyComponent(),
    title: 'Today\'s orders',
    icon: '&#xE8DF;',
  },
  {
    component: new UserBalanceTable(),
    title: 'Replenish balance',
    icon: '&#xE926;',
  },
  {
    component: new EmptyComponent(),
    title: 'Make an order',
    icon: '&#xE8CC;',
  },
];
function selectTab(index, navBar) {
  const tab = navBar.children[index];
  const currentTab = document.querySelector('.nav-bar-selected');
  if (currentTab) currentTab.classList.remove('nav-bar-selected');
  tab.classList.add('nav-bar-selected');
}
function renderTab(target, indexOfTab, navBar) {
  target.innerHTML = '';
  tabs[indexOfTab].component.render(document.querySelector('.manager-content'));
  selectTab(indexOfTab, navBar);
}

function managerListeners(target, navBar) {
  [].forEach.call(navBar.children, (elem, index) => {
    elem.addEventListener('click', () => {
      renderTab(target, index, navBar);
    });
  });
}
export default class ManagerHomeScreen {
  render(screenTarget, props) {
    const header = new Header();
    header.render(screenTarget, props);
    const screen = createElementsFromString(template({ tab: tabs }));
    screenTarget.appendChild(screen);
    const contentTarget = screenTarget.querySelector('.manager-content');
    const navBar = screenTarget.querySelector('.nav-bar');
    renderTab(contentTarget, 0, navBar);
    managerListeners(contentTarget, navBar);
    return screenTarget;
  }
}
