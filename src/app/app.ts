import '../pages/login/login-validation';
import 'bootstrap';
import './index.scss';
import startRouting from './router/router';
import { PAGE } from '../pages/main/main-page';

document.body.append(PAGE);

window.addEventListener('load', startRouting);
