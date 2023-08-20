import 'bootstrap';
import '../pages/login/login-validation';
import { PAGE } from '../pages/main/main-page';
import './index.scss';
import startRouting from './router/router';

document.body.append(PAGE);

window.addEventListener('load', startRouting);
