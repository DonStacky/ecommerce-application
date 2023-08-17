import { MAIN_INNER, PAGE, MAIN } from '../../pages/main/main-page';
import Navigo from 'navigo';
import ABOUT_PAGE from '../../pages/about/about';
import { HEADER } from '../../widgets/header/header';
import CATALOG_PAGE from '../../pages/catalog/catalog';
import BASKET_PAGE from '../../pages/basket/basket';
import REG_PAGE from '../../pages/registration/registrarion';
import LoginForm from '../../pages/login/create-login-page';

const loginForm = new LoginForm();

const render = (content: HTMLElement) => {
  HEADER.classList.add('header-bottom__nav--common');
  MAIN.innerHTML = '';
  PAGE.style.height = '100vh';
  PAGE.style.display = 'flex';
  PAGE.style.flexDirection = 'column';
  PAGE.style.justifyContent = 'space-between';
  MAIN.append(content);
};

const startRouting = () => {
  const router = new Navigo('/');

  router
    .on('/about', () => {
      render(ABOUT_PAGE);
    })
    .on('/home', () => {
      render(MAIN_INNER);
      HEADER.classList.remove('header-bottom__nav--common');
    })
    .on('/catalog', () => {
      render(CATALOG_PAGE);
    })
    .on('/basket', () => {
      render(BASKET_PAGE);
    })
    .on('/login', () => {
      render(loginForm.FORM);
    })
    .on('/registration', () => {
      render(REG_PAGE);
    })
    .resolve();
};

export default startRouting;
