import './admin.css';
import AdminContent from './admin.hbs';
import Header from '../../components/header/header';
import Menu from "../../components/managerContent/menuContent/menuTable/table.js";

export default class AdminHomeScreen {
    constructor() {
    }

    render(screenTarget, props) {
        const adminContent = AdminContent();
        screenTarget.innerHTML = adminContent;

        const contentTarget = document.getElementById("admin-content");
        const menu = new Menu();
        const menuProps = { menu: true, date: "05.09 - 12.09" };
        menu.render(contentTarget, menuProps);

        const header = new Header();
        header.render(screenTarget, props);
        return screenTarget;
    }
}
