import { MAIN_INNER, PAGE, MAIN } from '../../pages/main/main-page';
import Navigo from 'navigo';
import ABOUT_PAGE from '../../pages/about/about';
import { HEADER, HEADER_ITEMS, MAIN_HEADER_ITEMS } from '../../widgets/header/header';
import CATALOG_PAGE from '../../pages/catalog/catalog';
import BASKET_PAGE from '../../pages/basket/basket';
import LOGIN_PAGE from '../../pages/login/create-login-page';
import { findDomElement } from '../../shared/helpers/dom-utilites';
import NOT_FOUND from '../../pages/not_found/not_found';
import REG_PAGE from '../../pages/registration/registration-form';
import DISCOUNTS_PAGE from '../../pages/discounts/discounts';
import PROMO_PAGE from '../../pages/promo/promo';

const render = (content: HTMLElement, linkID?: string) => {
  HEADER_ITEMS.forEach((item) => item.classList.remove('active'));

  if (linkID) {
    const navLink = findDomElement(document.body, linkID);
    if (navLink.parentElement) {
      navLink.parentElement.classList.add('active');
    }
  }

  HEADER.classList.add('header-bottom__nav--common');
  MAIN.innerHTML = '';
  PAGE.style.height = '100vh';
  PAGE.style.display = 'flex';
  PAGE.style.flexDirection = 'column';
  PAGE.style.justifyContent = 'space-between';
  MAIN.style.flexGrow = '1';
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
      render(LOGIN_PAGE, '#login');
    })
    .on('/registration', () => {
      render(REG_PAGE, '#registration');
    })
    .on('/discounts', () => {
      render(DISCOUNTS_PAGE);
    })
    .on('/promo', () => {
      render(PROMO_PAGE);
    })
    .notFound(() => {
      render(NOT_FOUND);
    })
    .resolve();
};

export default startRouting;
