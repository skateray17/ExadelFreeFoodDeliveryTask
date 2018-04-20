import './index.css';
import LoginScreen from './screens/login/login';

const login = new LoginScreen(document.getElementById('screen'), 'my@email');
login.render(document.getElementById('screen'), 'hidden');
