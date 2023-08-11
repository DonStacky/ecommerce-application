import { createElement } from '../../shared/helpers/dom-utilites';
import { CreateOptions } from '../../shared/types/types';
import logo from '../../../public/svg/logo-black.svg';

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
    ['id', 'navbarHeaderBotttom'],
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
HEADER_NAV_BUTTON.setAttribute('data-bs-target', '#navbarHeaderBotttom');
HEADER_NAV_BUTTON.setAttribute('aria-controls', 'navbarTogglerDemo02');
HEADER_NAV_BUTTON.setAttribute('aria-expanded', 'false');
HEADER_NAV_BUTTON.setAttribute('aria-label', 'Toggle navigation');

const HEADER_NAV_IMG = createElement({
  tagname: 'img',
  options: [
    ['src', logo],
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
  options: [['className', 'header-bottom__nav navbar navbar-expand-sm bg-body-tertiary sticky-top']],
  childElements: [HEADER_CONTAINER],
});

document.body.append(HEADER);

export default HEADER_LINKS;
