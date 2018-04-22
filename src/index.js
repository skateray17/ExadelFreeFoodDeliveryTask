import './index.css';
import AdminScreen from './screens/admin/admin';

const admin = new AdminScreen(document.getElementById("screen"));

let props = {
  isManagersPage: true,
  isUserManager: false,
};

admin.render(admin.parent, document.getElementById("header"), props);

