import '../pages/login/login-validation';
import 'bootstrap';
import './index.scss';
import getRoutes from './router/routes';
import { PAGE } from '../pages/main/main-page';
import ROUTER from './router/router';

document.body.append(PAGE);
// ROUTER.navigate('/home');
window.addEventListener('load', () => {
  getRoutes(ROUTER);
});
