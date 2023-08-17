import LoginForm from '../pages/login/create-login-page';
import '../pages/login/login-validation';
import 'bootstrap';
import './index.scss';
import MAIN_PAGE from '../pages/main/main-page';

document.body.append(MAIN_PAGE);

const loginForm = new LoginForm();
document.body.append(loginForm.FORM);
