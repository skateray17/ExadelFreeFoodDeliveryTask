import './admin.css';
import AdminContent from './admin.hbs';
import Header from '../../components/header/header.js';

export default class AdminHomeScreen {
    constructor() {
    }

    render(screenTarget, props) {
        let adminContent = AdminContent();
        let header = new Header();
        let child = header.render(screenTarget, props);
        screenTarget.innerHTML = child + adminContent ;
    }
}
