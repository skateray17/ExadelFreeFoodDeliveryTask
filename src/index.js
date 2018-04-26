import './index.css';
import AdminHomeScreen from './screens/admin/admin';

const admin = new AdminHomeScreen();

const props = {
  page: 'managerScreen',
  userRole: 'manager'
};

const target = document.getElementById('screen');
admin.render(target, props);
