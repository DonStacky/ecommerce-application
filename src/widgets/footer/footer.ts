import { createElement } from '../../shared/helpers/dom-utilites';
import { CreateOptions } from '../../shared/types/types';
import './footer.scss';

// --------------------- FOOTER COMPANY ---------------------

const headerLinkOptions: CreateOptions<'a'> = {
  tagname: 'a',
  options: [['href', '#']],
};
const footerCompanyText: string[] = ['Home', 'Catalog', 'About us'];

const FOOTER_COMPANY_LINKS = footerCompanyText.map((text) => {
  const FOOTER_COMPANY_LINK = createElement(headerLinkOptions);
  FOOTER_COMPANY_LINK.textContent = text;
  return FOOTER_COMPANY_LINK;
});

const FOOTER_CONPANY_ITEMS = FOOTER_COMPANY_LINKS.map((link) => {
  const FOOTER_CONPANY_ITEM = createElement({
    tagname: 'li',
    options: [['className', 'footer__item']],
    childElements: [link],
  });
  return FOOTER_CONPANY_ITEM;
});

const FOOTER_COMPANY_LIST = createElement({
  tagname: 'ul',
  options: [['className', 'footer__list']],
  childElements: [...FOOTER_CONPANY_ITEMS],
});

const FOOTER_COMPANY_TITLE = createElement({
  tagname: 'h4',
  options: [
    ['className', 'footer__title'],
    ['textContent', 'Company'],
  ],
});

// --------------------- FOOTER CUSTOMERS ---------------------

const footerCustomersText: string[] = ['Profile', 'Basket', 'Discounts', 'Promo codes'];

const FOOTER_CUSTOMERS_LINKS = footerCustomersText.map((text) => {
  const FOOTER_CUSTOMER_LINK = createElement(headerLinkOptions);
  FOOTER_CUSTOMER_LINK.textContent = text;
  return FOOTER_CUSTOMER_LINK;
});

const FOOTER_CUSTOMERS_ITEMS = FOOTER_CUSTOMERS_LINKS.map((link) => {
  const FOOTER_CUSTOMERS_ITEM = createElement({
    tagname: 'li',
    options: [['className', 'footer__item']],
    childElements: [link],
  });
  return FOOTER_CUSTOMERS_ITEM;
});

const FOOTER_CUSTOMERS_LIST = createElement({
  tagname: 'ul',
  options: [['className', 'footer__list']],
  childElements: [...FOOTER_CUSTOMERS_ITEMS],
});

const FOOTER_CUSTOMERS_TITLE = createElement({
  tagname: 'h4',
  options: [
    ['className', 'footer__title'],
    ['textContent', 'For customers'],
  ],
});

// --------------------- FOOTER CONTACTS ---------------------

const footerContactsText: string[][] = [
  [' span_team@gmail.com', 'fa-solid fa-envelope'],
  [' 132-456-78-28', 'fa-solid fa-mobile-screen'],
  [' 756-456-34-57', 'fa-solid fa-mobile-screen'],
];

const FOOTER_CONTACTS_LINKS = footerContactsText.map(([text, icon]) => {
  const FOOTER_CONTACTS_LINK = createElement({
    tagname: 'a',
    options: [['href', '#']],
  });
  FOOTER_CONTACTS_LINK.innerHTML = `<i class="${icon}"></i> ${text}`;
  return FOOTER_CONTACTS_LINK;
});

const FOOTER_CONTACTS_ITEMS = FOOTER_CONTACTS_LINKS.map((link) => {
  const FOOTER_CONTACTS_ITEM = createElement({
    tagname: 'li',
    options: [['className', 'footer__item']],
    childElements: [link],
  });
  return FOOTER_CONTACTS_ITEM;
});

const FOOTER_CONTACTS_LIST = createElement({
  tagname: 'ul',
  options: [['className', 'footer__list']],
  childElements: [...FOOTER_CONTACTS_ITEMS],
});

const FOOTER_CONTACTS_TITLE = createElement({
  tagname: 'h4',
  options: [
    ['className', 'footer__title'],
    ['textContent', 'For customers'],
  ],
});

// --------------------- FOOTER SOCIALS ---------------------

const footerSocialText: string[] = [
  'fa-brands fa-facebook',
  'fa-brands fa-youtube',
  'fa-brands fa-instagram',
  'fa-brands fa-vk',
];

const FOOTER_SOCIAL_LINKS = footerSocialText.map((style) => {
  const FOOTER_SOCIAL_LINK = createElement({
    tagname: 'a',
    options: [['href', 'https://rs.school/js/']],
  });
  FOOTER_SOCIAL_LINK.innerHTML = `<i class="${style}"></i>`;
  return FOOTER_SOCIAL_LINK;
});

const FOOTER_SOCIAL_ITEMS = FOOTER_SOCIAL_LINKS.map((link) => {
  const FOOTER_SOCIAL_ITEM = createElement({
    tagname: 'li',
    options: [['className', 'footer__item']],
    childElements: [link],
  });
  return FOOTER_SOCIAL_ITEM;
});

const FOOTER_SOCIAL_LIST = createElement({
  tagname: 'ul',
  options: [['className', 'footer__list footer__socials']],
  childElements: [...FOOTER_SOCIAL_ITEMS],
});

const FOOTER_SOCIAL_TITLE = createElement({
  tagname: 'h4',
  options: [
    ['className', 'footer__title'],
    ['textContent', 'For customers'],
  ],
});

// --------------------- FOOTER LAYOUT ---------------------

const FOOTER_GRID_COLUMNS = [
  [FOOTER_COMPANY_TITLE, FOOTER_COMPANY_LIST],
  [FOOTER_CUSTOMERS_TITLE, FOOTER_CUSTOMERS_LIST],
  [FOOTER_CONTACTS_TITLE, FOOTER_CONTACTS_LIST],
  [FOOTER_SOCIAL_TITLE, FOOTER_SOCIAL_LIST],
].map((content) => {
  const FOOTER_COLUMN = createElement({
    tagname: 'div',
    options: [['className', 'col col-6 col-lg-3']],
    childElements: [...content],
  });
  return FOOTER_COLUMN;
});

const FOOTER_GRID_ROW = createElement({
  tagname: 'div',
  options: [['className', 'row d-flex g-4']],
  childElements: [...FOOTER_GRID_COLUMNS],
});

const FOOTER_GRID_CONTAINER = createElement({
  tagname: 'div',
  options: [['className', 'container-xl']],
  childElements: [FOOTER_GRID_ROW],
});

const FOOTER = createElement({
  tagname: 'footer',
  options: [['className', 'footer']],
  childElements: [FOOTER_GRID_CONTAINER],
});

export default FOOTER;
