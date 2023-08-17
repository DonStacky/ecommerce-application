import '../pages/login/login-validation';
import 'bootstrap';
import './index.scss';
import startRouting from './router/router';
// import MAIN_PAGE from '../pages/main/main-page';
import { PAGE } from '../pages/main/main-page';

document.body.append(PAGE);

document.body.append();

window.addEventListener('load', startRouting);
