import { MAIN_INNER, PAGE, MAIN } from '../../pages/main/main-page';
import Navigo from 'navigo';
import ABOUT_PAGE from '../../pages/about/about';
import { HEADER, HEADER_LINKS, MAIN_HEADER_ITEMS } from '../../widgets/header/header';
import CATALOG_PAGE from '../../pages/catalog/catalog';
import BASKET_PAGE from '../../pages/basket/basket';
import REG_PAGE from '../../pages/registration/registrarion';
import LoginForm from '../../pages/login/create-login-page';
import { findDomElement } from '../../shared/helpers/dom-utilites';
import NOT_FOUND from '../../pages/not_found/not_found';

const loginForm = new LoginForm();

const render = (content: HTMLElement, linkID?: string) => {
  if (linkID) {
    HEADER_LINKS.forEach((link) => link.classList.remove('active'));

    const navLink = findDomElement(document.body, linkID);
    navLink.classList.add('active');
  }

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
      render(ABOUT_PAGE, '#about');
    })
    .on('/home', () => {
      render(MAIN_INNER, '#home');
      HEADER.classList.remove('header-bottom__nav--common');
      MAIN_HEADER_ITEMS[0].classList.add('active');
    })
    .on(() => {
      render(MAIN_INNER, '#home');
      HEADER.classList.remove('header-bottom__nav--common');
      MAIN_HEADER_ITEMS[0].classList.add('active');
    })
    .on('/catalog', () => {
      render(CATALOG_PAGE, '#catalog');
    })
    .on('/basket', () => {
      render(BASKET_PAGE, '#basket');
    })
    .on('/login', () => {
      render(loginForm.FORM, '#login');
    })
    .on('/registration', () => {
      render(REG_PAGE, '#registration');
    })
    .notFound(() => {
      render(NOT_FOUND);
    })
    .resolve();
};

export default startRouting;
