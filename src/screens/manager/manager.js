import './manager.css';
import managerTemplate from './manager.hbs';
import Header from '../../components/header/header';
import Menu from '../../components/managerContent/menuContent/menuTable/table';
import UserBalanceTable from '../../components/managerContent/userBalanceTable/userBalanceTable';
import { createElementsFromString } from '../../common/utils';
import MakeOrder from '../../components/managerContent/makeOrderContent/makeOrder';
import TodayOrders from '../../components/managerContent/todayOrdersContent/todayOrders';


const tabs = [
  {
    component: new Menu(),
    title: 'Upload menu',
    icon: '&#xE561;',
  },
  {
    component: new TodayOrders(),
    title: 'Today\'s orders',
    icon: '&#xE8DF;',
  },
  {
    component: new UserBalanceTable(),
    title: 'Replenish balance',
    icon: '&#xE926;',
  },
  {
    component: new MakeOrder(),
    title: 'Make an order',
    icon: '&#xE8CC;',
  },
];

export default class ManagerHomeScreen {
  constructor(router) {
    this.router = router;
  }

  render(target, props) {
    props = {
      page: 'manager',
      router: this.router,
    };
    this.header = new Header();
    this.header.render(target, props);

    const screen = createElementsFromString(managerTemplate({ tab: tabs }));
    target.appendChild(screen);
    const contentTarget = target.querySelector('.manager-content');
    const navBar = target.querySelector('.nav-bar');
    renderTab(contentTarget, 0, navBar);
    managerListeners(contentTarget, navBar);
    return target;
  }

  destroy() {
    this.header.destroy();
  }
}

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
