import { createElement } from '../../shared/helpers/dom-utilites';
import { CreateOptions } from '../../shared/types/types';
import blackLogo from '../../../public/svg/logo-black.svg';
import whiteLogo from '../../../public/svg/logo-white.svg';
import './header.scss';

// --------------------- COMMON HEADER ---------------------

const headerLinkOptions: CreateOptions<'a'> = {
  tagname: 'a',
  options: [
    ['className', 'header-bottom__link active nav-link'],
    ['href', '#'],
  ],
};
const headerLinkText: string[] = ['Home', 'Catalog', 'Basket', 'Profile', 'About us'];

const HEADER_LINKS = headerLinkText.map((link) => {
  const HEADER_LINK = createElement(headerLinkOptions);
  HEADER_LINK.textContent = link;
  return HEADER_LINK;
});
HEADER_LINKS[0].setAttribute('aria-current', 'page');
const HEADER_ITEMS = HEADER_LINKS.map((link) => {
  const HEADER_ITEM = createElement({
    tagname: 'li',
    options: [['className', 'header-bottom__item nav-item']],
    childElements: [link],
  });
  return HEADER_ITEM;
});

const HEADER_LIST = createElement({
  tagname: 'ul',
  options: [['className', 'header-bottom__list navbar-nav me-auto mb-2 mb-lg-0']],
  childElements: [...HEADER_ITEMS],
});

const HEADER_LIST_WRAPPER = createElement({
  tagname: 'div',
  options: [
    ['className', 'collapse navbar-collapse'],
    ['id', 'navbarHeaderBottom'],
  ],
  childElements: [HEADER_LIST],
});

const HEADER_NAV_BUTTON = createElement({
  tagname: 'button',
  options: [
    ['className', 'navbar-toggler'],
    ['type', 'button'],
  ],
  childElements: [
    createElement({
      tagname: 'span',
      options: [['className', 'navbar-toggler-icon']],
    }),
  ],
});
HEADER_NAV_BUTTON.setAttribute('data-bs-toggle', 'collapse');
HEADER_NAV_BUTTON.setAttribute('data-bs-target', '#navbarHeaderBottom');
HEADER_NAV_BUTTON.setAttribute('aria-controls', 'navbarHeaderBottom');
HEADER_NAV_BUTTON.setAttribute('aria-expanded', 'false');
HEADER_NAV_BUTTON.setAttribute('aria-label', 'Toggle navigation');

const HEADER_NAV_IMG = createElement({
  tagname: 'img',
  options: [
    ['src', blackLogo],
    ['alt', 'logo'],
  ],
});

const HEADER_NAV_LOGO = createElement({
  tagname: 'a',
  options: [
    ['className', 'navbar-brand'],
    ['href', '#'],
  ],
  childElements: [HEADER_NAV_IMG],
});

const HEADER_CONTAINER = createElement({
  tagname: 'div',
  options: [['className', 'container-fluid']],
  childElements: [HEADER_NAV_LOGO, HEADER_NAV_BUTTON, HEADER_LIST_WRAPPER],
});

const HEADER = createElement({
  tagname: 'nav',
  options: [['className', 'header-bottom__nav navbar navbar-expand-sm bg-body-tertiary sticky-top element-show']],
  childElements: [HEADER_CONTAINER],
});

// --------------------- MAIN PAGE HEADER-STARTLINE ---------------------

const mainHeaderLinkOptions: CreateOptions<'a'> = {
  tagname: 'a',
  options: [
    ['className', 'nav-link header__link active'],
    ['href', '#'],
  ],
};

const MAIN_HEADER_LINKS = headerLinkText.map((link) => {
  const MAIN_HEADER_LINK = createElement(mainHeaderLinkOptions);
  MAIN_HEADER_LINK.textContent = link;
  return MAIN_HEADER_LINK;
});

MAIN_HEADER_LINKS[0].setAttribute('aria-current', 'page');

const MAIN_HEADER_ITEMS = MAIN_HEADER_LINKS.map((link) => {
  const HEADER_ITEM = createElement({
    tagname: 'li',
    options: [['className', 'nav-item header__item']],
    childElements: [link],
  });
  return HEADER_ITEM;
});

MAIN_HEADER_ITEMS[0].classList.add('active');

const MAIN_HEADER_LIST = createElement({
  tagname: 'ul',
  options: [['className', 'navbar-nav header__list me-auto ms-auto mb-2 mb-lg-0 top-menu text-center']],
  childElements: [...MAIN_HEADER_ITEMS],
});

const HEADER_BTN_CLOSE = createElement({
  tagname: 'button',
  options: [
    ['className', 'btn-close header__close ms-auto p-5'],
    ['type', 'button'],
  ],
});
HEADER_BTN_CLOSE.setAttribute('data-bs-dismiss', 'offcanvas');
HEADER_BTN_CLOSE.setAttribute('aria-label', 'Close');

const MAIN_HEADER_LIST_WRAPPER = createElement({
  tagname: 'div',
  options: [
    ['className', 'offcanvas offcanvas-star'],
    ['id', 'navbarHomePage'],
  ],
  childElements: [HEADER_BTN_CLOSE, MAIN_HEADER_LIST],
});

const MAIN_HEADER_NAV_BOTTOM = createElement({
  tagname: 'nav',
  options: [
    ['className', 'navbar navbar-expand-sm'],
    ['id', 'navbarHomePage'],
  ],
  childElements: [MAIN_HEADER_LIST_WRAPPER],
});
MAIN_HEADER_NAV_BOTTOM.setAttribute('data-bs-theme', 'dark');

const MAIN_HEADER_NAV_BUTTON = createElement({
  tagname: 'button',
  options: [
    ['className', 'navbar-toggler header__toggler'],
    ['type', 'button'],
  ],
  childElements: [
    createElement({
      tagname: 'span',
      options: [['className', 'navbar-toggler-icon']],
    }),
  ],
});
MAIN_HEADER_NAV_BUTTON.setAttribute('data-bs-toggle', 'offcanvas');
MAIN_HEADER_NAV_BUTTON.setAttribute('data-bs-target', '#navbarHomePage');
MAIN_HEADER_NAV_BUTTON.setAttribute('aria-controls', 'navbarHomePage');
MAIN_HEADER_NAV_BUTTON.setAttribute('aria-expanded', 'false');
MAIN_HEADER_NAV_BUTTON.setAttribute('aria-label', 'Toggle navigation');

const MAIN_HEADER_NAV_IMG = createElement({
  tagname: 'img',
  options: [
    ['className', 'logo__img'],
    ['src', whiteLogo],
    ['alt', 'logo'],
  ],
});

const MAIN_HEADER_NAV_LOGO = createElement({
  tagname: 'a',
  options: [
    ['className', 'navbar-brand logo__link'],
    ['href', '#'],
  ],
  childElements: [MAIN_HEADER_NAV_IMG],
});

const MAIN_HEADER_AUTH_BTNS = ['Log in', 'Sign up'].map((text) => {
  const MAIN_HEADER_AUTH_BTN = createElement({
    tagname: 'button',
    options: [
      ['className', 'btn btn-light'],
      ['textContent', `${text}`],
    ],
  });
  return MAIN_HEADER_AUTH_BTN;
});

const MAIN_HEADER_BTN_BOX = createElement({
  tagname: 'div',
  options: [['className', 'btn-group btn__box']],
  childElements: [...MAIN_HEADER_AUTH_BTNS],
});
MAIN_HEADER_BTN_BOX.setAttribute('role', 'group');

const MAIN_HEADER_NAV_TOP = createElement({
  tagname: 'div',
  options: [['className', 'navbar navbar-expand-sm']],
  childElements: [MAIN_HEADER_NAV_BUTTON, MAIN_HEADER_NAV_LOGO, MAIN_HEADER_BTN_BOX],
});
MAIN_HEADER_NAV_TOP.setAttribute('data-bs-theme', 'dark');

const MAIN_HEADER_STARTLINE = createElement({
  tagname: 'div',
  options: [['className', 'container-xl header__startline']],
  childElements: [MAIN_HEADER_NAV_TOP, MAIN_HEADER_NAV_BOTTOM],
});

// --------------------- MAIN PAGE HEADER-BODY ---------------------

const MAIN_HEADER_TEXT = createElement({
  tagname: 'p',
  options: [
    ['className', 'text-light m-5'],
    [
      'textContent',
      'Welcome to our website dedicated to wooden products! We are proud to offer a wide range of items made of high-quality natural materials.',
    ],
  ],
});

const MAIN_HEADER_TITLE = createElement({
  tagname: 'h1',
  options: [
    ['className', 'text-light'],
    ['textContent', 'HANDMADE WOOD PRODUCTS'],
  ],
});

const MAIN_HEADER_VIEW_BTN = createElement({
  tagname: 'button',
  options: [
    ['className', 'btn btn-light btn-lg'],
    ['textContent', 'View more'],
  ],
});

const MAIN_HEADER_DESC = createElement({
  tagname: 'div',
  options: [
    [
      'className',
      'col text-center col-sm-6 col-12 d-flex flex-column justify-content-center align-items-center header__text',
    ],
  ],
  childElements: [MAIN_HEADER_TITLE, MAIN_HEADER_TEXT, MAIN_HEADER_VIEW_BTN],
});

// const

const MAIN_HEADER = createElement({
  tagname: 'header',
  options: [['className', 'header d-flex flex-column']],
  childElements: [MAIN_HEADER_STARTLINE, MAIN_HEADER_DESC],
});

document.body.append(MAIN_HEADER);

export default HEADER;
