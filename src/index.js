import './index.css';
import AdminHomeScreen from './screens/admin/admin';

const admin = new AdminHomeScreen();

let props = {
  isManagersPage: true,
  isUserManager: true
};

admin.render(document.getElementById("screen"), props);

