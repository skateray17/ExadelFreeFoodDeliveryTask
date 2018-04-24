import './admin.css';
import AdminContent from './admin.hbs';
import Header from '../../components/header/header.js';

export default class AdminHomeScreen {
    constructor() {
    }

    render(screenTarget, props) {
        let adminContent = AdminContent();
        screenTarget.innerHTML = adminContent;
        let header = new Header();
        header.render(screenTarget, props);
        return true;
    }
}
