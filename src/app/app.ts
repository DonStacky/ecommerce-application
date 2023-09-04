import 'bootstrap';
import '../pages/login/login-validation';
import './index.scss';
import ROUTER from './router/router';
import getRoutes from './router/routes';

window.addEventListener('load', () => {
  getRoutes(ROUTER);
});
