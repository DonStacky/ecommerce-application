import LoginForm from '../pages/login/create-login-page';
import '../pages/login/login-validation';
import './index.scss';

const loginForm = new LoginForm();
document.body.append(loginForm.FORM);
