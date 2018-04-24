import './index.css';
import LoginScreen from './screens/login/login';

const login = new LoginScreen();
login.render(document.getElementById('screen'), { displayError: false });
