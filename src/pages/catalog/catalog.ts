import { createElement } from '../../shared/helpers/dom-utilites';
import sailboat from '@image/sailboat.jpg';
import './catalog.scss';

const cardTitle = createElement({
  tagname: 'h5',
  options: [
    ['textContent', 'Card title'],
    ['className', 'card-title'],
  ],
});

const cardText = createElement({
  tagname: 'p',
  options: [
    ['textContent', `Some quick example text to build on the card title and make up the bulk of the card's content.`],
    ['className', 'card-text'],
  ],
});

const cardBtn = createElement({
  tagname: 'a',
  options: [
    ['textContent', `Go somewhere`],
    ['className', 'btn btn-primary'],
    ['href', '#'],
  ],
});

const cardInner = createElement({
  tagname: 'div',
  options: [['className', 'card-body']],
  childElements: [cardTitle, cardText, cardBtn],
});

const cardImg = createElement({
  tagname: 'img',
  options: [
    ['className', 'card-img-top'],
    ['alt', 'card-img-top'],
    ['src', sailboat],
  ],
});

const card = createElement({
  tagname: 'div',
  options: [
    ['className', 'card'],
    ['style', 'width: 18rem;'],
  ],
  childElements: [cardImg, cardInner],
});

const CATALOG_PAGE = createElement({
  tagname: 'section',
  options: [['className', 'catalog d-flex justify-content-center align-items-center']],
  childElements: [card],
});

export default CATALOG_PAGE;
