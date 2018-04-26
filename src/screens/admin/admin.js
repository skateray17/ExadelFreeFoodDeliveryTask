import './admin.css';
import AdminContent from './admin.hbs';
import Header from '../../components/header/header';

export default class AdminHomeScreen {
    constructor() {
    }

    render(screenTarget, props) {
        const adminContent = AdminContent();
        screenTarget.innerHTML = adminContent;
        const header = new Header();
        header.render(screenTarget, props);
        return screenTarget;
    }
}
