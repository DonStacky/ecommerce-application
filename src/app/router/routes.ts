import regBack from '@image/flower-decorating.jpg';
import loginBack from '@image/hand-holding-string.jpg';
import footerBack from '@image/tools-and-wood-sawdust-in-workshop.jpg';
import Navigo from 'navigo';
import ABOUT_PAGE from '../../pages/about/about';
import BasketPage from '../../pages/basket/create-basket-page';
import { showBreadCrumb } from '../../pages/catalog/breadcrumb';
import CATALOG_PAGE from '../../pages/catalog/catalog';
import CONTENT from '../../pages/catalog/content';
import search from '../../pages/catalog/product-search';
import { getProductWithKey } from '../../pages/detailed/detailed-data';
import { DETAILED_PAGE, getDetailedInfo } from '../../pages/detailed/detailed-page';
import DISCOUNTS_PAGE from '../../pages/discounts/discounts';
import LOGIN_PAGE from '../../pages/login/create-login-page';
import { MAIN, MAIN_INNER, PAGE } from '../../pages/main/main-page';
import NOT_FOUND from '../../pages/not_found/not_found';
import ProfilePage from '../../pages/profile/create-profile-page';
import PROMO_PAGE from '../../pages/promo/promo';
import REG_PAGE from '../../pages/registration/registration-form';
import { findDomElement } from '../../shared/helpers/dom-utilites';
import FOOTER from '../../widgets/footer/footer';
import {
  addLogoutBtn,
  HEADER,
  HEADER_ITEMS,
  HEADER_LIST,
  LOG_OUT_ITEM,
  MAIN_HEADER_ITEMS,
  PROFILE_ITEM,
  // eslint-disable-next-line prettier/prettier
  PROFILE_LINK
} from '../../widgets/header/header';
import ROUTER from './router';

const render = (content: HTMLElement, linkID?: string) => {
  if (localStorage.getItem('tokenCache')) {
    if (linkID === '#home') {
      addLogoutBtn();
    } else {
      LOG_OUT_ITEM.classList.remove('logout--main');
      PROFILE_ITEM.classList.remove('header__item');
      PROFILE_LINK.classList.remove('header__link');
      PROFILE_LINK.classList.add('header-bottom__link');
      PROFILE_ITEM.classList.add('header-bottom__item');
      HEADER_LIST.append(PROFILE_ITEM, LOG_OUT_ITEM);
    }
  }

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
      if (!CONTENT.childElementCount) {
        search({});
        showBreadCrumb(['All']);
      }
    })
    .on('/catalog/all/', () => {
      render(CATALOG_PAGE, '#catalog');
      search({});
      showBreadCrumb(['All']);
    })
    .on('/catalog/all/winter', () => {
      render(CATALOG_PAGE, '#catalog');
      search({ seasons: ['winter'] });
      showBreadCrumb(['All', 'Winter']);
    })
    .on('/catalog/all/spring', () => {
      render(CATALOG_PAGE, '#catalog');
      search({ seasons: ['spring'] });
      showBreadCrumb(['All', 'Spring']);
    })
    .on('/catalog/all/summer', () => {
      render(CATALOG_PAGE, '#catalog');
      search({ seasons: ['summer'] });
      showBreadCrumb(['All', 'Summer']);
    })
    .on('/catalog/all/autumn', () => {
      render(CATALOG_PAGE, '#catalog');
      search({ seasons: ['autumn'] });
      showBreadCrumb(['All', 'Autumn']);
    })
    .on('/basket', () => {
      render(new BasketPage().LIST, '#basket');
    })
    .on('/login', () => {
      if (localStorage.getItem('tokenCache')) {
        ROUTER.navigate('/');
      } else {
        render(LOGIN_PAGE, '#login');
      }
    })
    .on('/registration', () => {
      if (localStorage.getItem('tokenCache')) {
        ROUTER.navigate('/');
      } else {
        render(REG_PAGE, '#registration');
      }
    })
    .on('/discounts', () => {
      render(DISCOUNTS_PAGE);
    })
    .on('/promo', () => {
      render(PROMO_PAGE);
    })
    .on('/profile', () => {
      if (localStorage.getItem('tokenCache')) {
        render(new ProfilePage().PROFILE_CONTAINER);
      } else {
        ROUTER.navigate('/login');
      }
    })
    .on('/catalog/:key', async (match) => {
      if (match) {
        const { data } = match;

        if (data) {
          try {
            const { id } = (await getProductWithKey(data.key)).body;
            getDetailedInfo(id);
            render(DETAILED_PAGE);
          } catch {
            render(NOT_FOUND);
          }
        }
      }
    })
    .notFound(() => {
      render(NOT_FOUND);
    })
    .resolve();
};

export default getRoutes;
