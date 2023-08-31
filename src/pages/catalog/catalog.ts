import { createElement } from '../../shared/helpers/dom-utilites';
// import sailboat from '@image/sailboat.jpg';
import './catalog.scss';
import { productsImgURL, productsTitle, productsText } from './catalog-data';

console.log(productsImgURL);

const cardTitle = createElement({
  tagname: 'h5',
  options: [['className', 'card-title']],
});
productsTitle.then((title) => {
  cardTitle.textContent = `${title}`;
});

const cardText = createElement({
  tagname: 'p',
  options: [
    ['textContent', `Some quick example text to build on the card title and make up the bulk of the card's content.`],
    ['className', 'card-text'],
  ],
});
productsText.then((text) => {
  cardText.textContent = `${text}`;
});

const cardBtn = createElement({
  tagname: 'a',
  options: [
    ['textContent', `Go somewhere`],
    ['className', 'btn btn-primary'],
    ['href', '#'],
  ],
});

const cardMore = createElement({
  tagname: 'a',
  options: [
    ['textContent', `More...`],
    ['className', 'card-link'],
  ],
});
function toggleCardDescription() {
  cardText.classList.toggle('card-text--active');
  if (cardMore.textContent === 'Less...') {
    cardMore.textContent = 'More...';
  } else {
    cardMore.textContent = 'Less...';
  }
}
cardMore.addEventListener('click', toggleCardDescription);

const cardInner = createElement({
  tagname: 'div',
  options: [['className', 'card-body']],
  childElements: [cardTitle, cardText, cardMore, cardBtn],
});

const cardImg = createElement({
  tagname: 'img',
  options: [
    ['className', 'card-img-top'],
    ['alt', 'card-img-top'],
  ],
});
productsImgURL.then((url) => cardImg.setAttribute('src', `${url}`));

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
