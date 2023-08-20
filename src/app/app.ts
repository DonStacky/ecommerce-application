import '../pages/login/login-validation';
import 'bootstrap';
import './index.scss';
import getRoutes from './router/routes';
import ROUTER from './router/router';

window.addEventListener('load', () => {
  getRoutes(ROUTER);
});
