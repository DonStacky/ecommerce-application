import regBack from '@image/flower-decorating.jpg';
import loginBack from '@image/hand-holding-string.jpg';
import footerBack from '@image/tools-and-wood-sawdust-in-workshop.jpg';
import Navigo from 'navigo';
import ABOUT_PAGE from '../../pages/about/about';
import BASKET_PAGE from '../../pages/basket/basket';
import CATALOG_PAGE from '../../pages/catalog/catalog';
import DISCOUNTS_PAGE from '../../pages/discounts/discounts';
import LOGIN_PAGE from '../../pages/login/create-login-page';
import { MAIN, MAIN_INNER, PAGE } from '../../pages/main/main-page';
import NOT_FOUND from '../../pages/not_found/not_found';
import PROMO_PAGE from '../../pages/promo/promo';
import REG_PAGE from '../../pages/registration/registration-form';
import { findDomElement } from '../../shared/helpers/dom-utilites';
import FOOTER from '../../widgets/footer/footer';
import { HEADER, HEADER_ITEMS, MAIN_HEADER_ITEMS } from '../../widgets/header/header';
import ROUTER from './router';

const render = (content: HTMLElement, linkID?: string) => {
  if (content === LOGIN_PAGE) {
    document.body.style.background = `url(${loginBack}) 0 0 / cover`;
    FOOTER.style.background = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))`;
  } else if (content === REG_PAGE) {
    document.body.style.background = `url(${regBack}) 0 0 / cover`;
    FOOTER.style.background = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))`;
  } else {
    document.body.style.background = 'transparent';
    FOOTER.style.background = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${footerBack}) 0 100% / cover no-repeat`;
  }

  HEADER_ITEMS.forEach((item) => item.classList.remove('active'));

  if (linkID) {
    const navLink = findDomElement(document.body, linkID);
    if (navLink.parentElement) {
      navLink.parentElement.classList.add('active');
    }
  }

  HEADER.classList.add('header-bottom__nav--common');
  MAIN.innerHTML = '';
  MAIN.append(content);
};

const getRoutes = (router: Navigo) => {
  document.body.append(PAGE);

  router
    .on('/about', () => {
      render(ABOUT_PAGE, '#about');
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
      if (localStorage.getItem('tokenCache')) {
        ROUTER.navigate('/');
      } else {
        render(LOGIN_PAGE, '#login');
      }
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

export default getRoutes;
