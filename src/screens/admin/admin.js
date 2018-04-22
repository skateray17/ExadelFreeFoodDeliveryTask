import './admin.css';
import AdminContent from './admin.hbs';
import Header from '../../components/header/header.js';

export default class AdminScreen {
    constructor(parent) {
        this.parent = parent;
    }

    render(screenTarget, headerTarget, props) {
        screenTarget.innerHTML = AdminContent();
        let header = new Header();
        headerTarget.innerHTML = header.render(headerTarget, props);
    }
}
