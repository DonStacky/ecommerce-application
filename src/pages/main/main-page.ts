import { createElement, findDomElement } from '../../shared/helpers/dom-utilites';
import sailboat from '@image/sailboat.jpg';
import happyWoman from '@image/happy-woman.jpg';
import { HEADER, MAIN_HEADER } from '../../widgets/header/header';
import FOOTER from '../../widgets/footer/footer';
import './main-page.scss';

// ------------- OUR PRODUCTS -------------

const PRODUCTS_TEXT = createElement({
  tagname: 'p',
  options: [
    ['className', 'm-5 text-dark'],
    [
      'textContent',
      'We are committed to ensuring that our wooden products are crafted by skilled artisans using only the finest materials and techniques. Each item is unique and has its own personality, making it not only beautiful but also useful for your home or office.',
    ],
  ],
});

const PRODUCTS_TITLE = createElement({
  tagname: 'h1',
  options: [
    ['className', 'text-dark'],
    ['textContent', 'OUR PRODUCTS'],
  ],
});

const PRODUCTS_BUTTON = createElement({
  tagname: 'button',
  options: [
    ['className', 'btn btn-lg btn-dark'],
    ['textContent', 'View more'],
  ],
});
PRODUCTS_BUTTON.setAttribute('href', '/catalog');
PRODUCTS_BUTTON.dataset.navigo = 'true';

const PRODUCTS_DESC_COLUMN = createElement({
  tagname: 'div',
  options: [['className', 'col col-sm-7 col-12 main-section__text']],
  childElements: [PRODUCTS_TITLE, PRODUCTS_TEXT, PRODUCTS_BUTTON],
});

const PRODUCTS_IMAGE = createElement({
  tagname: 'img',
  options: [
    ['alt', 'sailboat'],
    ['src', sailboat],
    ['className', 'aside__image'],
  ],
});

const PRODUCTS_IMG_COLUMN = createElement({
  tagname: 'div',
  options: [['className', 'col col-sm-5']],
  childElements: [PRODUCTS_IMAGE],
});

const PRODUCTS_CONTAINER = createElement({
  tagname: 'div',
  options: [['className', 'container-xl d-flex align-items-center text-center']],
  childElements: [PRODUCTS_IMG_COLUMN, PRODUCTS_DESC_COLUMN],
});

const PRODUCTS_SECTION = createElement({
  tagname: 'section',
  options: [['className', 'main-section__products d-flex align-items-center']],
  childElements: [PRODUCTS_CONTAINER],
});

// ------------- OUR CUSTOMERS -------------

const CUSTOMERS_TEXT = createElement({
  tagname: 'p',
  options: [
    ['className', 'text-light m-5'],
    [
      'textContent',
      'The company\'s customers appreciate it for the high quality of products, individual approach to each order and efficiency of work. Company "Rustikka" is a reliable partner for many companies and individuals who are looking for quality and original wooden gifts.',
    ],
  ],
});

const CUSTOMERS_TITLE = createElement({
  tagname: 'h1',
  options: [
    ['className', 'text-light'],
    ['textContent', 'OUR CUSTOMERS'],
  ],
});

const CUSTOMERS_BUTTON = createElement({
  tagname: 'button',
  options: [
    ['className', 'btn btn-lg btn-dark'],
    ['textContent', 'View more'],
  ],
});
CUSTOMERS_BUTTON.setAttribute('href', '/catalog');
CUSTOMERS_BUTTON.dataset.navigo = 'true';

const CUSTOMERS_DESC_COLUMN = createElement({
  tagname: 'div',
  options: [['className', 'col col-sm-7 col-12 main-section__text']],
  childElements: [CUSTOMERS_TITLE, CUSTOMERS_TEXT, CUSTOMERS_BUTTON],
});

const CUSTOMERS_IMAGE = createElement({
  tagname: 'img',
  options: [
    ['alt', 'happyWoman'],
    ['src', happyWoman],
    ['className', 'aside__image'],
  ],
});

const CUSTOMERS_IMG_COLUMN = createElement({
  tagname: 'div',
  options: [['className', 'col col-sm-5']],
  childElements: [CUSTOMERS_IMAGE],
});

const CUSTOMERS_CONTAINER = createElement({
  tagname: 'div',
  options: [['className', 'container-xl d-flex align-items-center text-center']],
  childElements: [CUSTOMERS_DESC_COLUMN, CUSTOMERS_IMG_COLUMN],
});

const CUSTOMERS_SECTION = createElement({
  tagname: 'section',
  options: [['className', 'main-section__customers d-flex align-items-center']],
  childElements: [CUSTOMERS_CONTAINER],
});

export const MAIN_INNER = createElement({
  tagname: 'div',
  childElements: [MAIN_HEADER, PRODUCTS_SECTION, CUSTOMERS_SECTION],
});

export const MAIN = createElement({
  tagname: 'main',
});

export const PAGE = createElement({
  tagname: 'div',
  childElements: [HEADER, MAIN, FOOTER],
});

function toggleHeader() {
  const stickyHeader = findDomElement(document.body, '.header-bottom__nav');
  if (window.scrollY > 200) {
    stickyHeader.classList.add('element-show');
  } else {
    stickyHeader.classList.remove('element-show');
  }
}

window.addEventListener('scroll', toggleHeader);
