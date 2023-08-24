import notFound from '@svg/404_not_found.svg';
import { createElement } from '../../shared/helpers/dom-utilites';

const NOT_FOUND_TEXT = createElement({
  tagname: 'p',
  options: [
    ['className', 'text-dark mt-5 mb-5'],
    ['textContent', 'Maybe you used an invalid link or the page was deleted.'],
  ],
});

const NOT_FOUND_TITLE = createElement({
  tagname: 'h1',
  options: [
    ['className', 'text-dark'],
    ['textContent', 'There is nothing here...'],
  ],
});

const NOT_FOUND_BUTTON = createElement({
  tagname: 'button',
  options: [
    ['className', 'btn btn-lg btn-dark'],
    ['textContent', 'Go to home page'],
  ],
});
NOT_FOUND_BUTTON.setAttribute('href', '/');
NOT_FOUND_BUTTON.dataset.navigo = 'true';

const NOT_FOUND_DESC_COLUMN = createElement({
  tagname: 'div',
  options: [['className', 'col col-sm-6 col-12']],
  childElements: [NOT_FOUND_TITLE, NOT_FOUND_TEXT, NOT_FOUND_BUTTON],
});

const NOT_FOUND_IMAGE = createElement({
  tagname: 'img',
  options: [
    ['alt', 'Page not found'],
    ['src', notFound],
    ['className', 'aside__image'],
  ],
});

const NOT_FOUND_IMG_COLUMN = createElement({
  tagname: 'div',
  options: [['className', 'col col-sm-6']],
  childElements: [NOT_FOUND_IMAGE],
});

const NOT_FOUND_CONTAINER = createElement({
  tagname: 'div',
  options: [['className', 'container-xl d-flex align-items-center text-center']],
  childElements: [NOT_FOUND_DESC_COLUMN, NOT_FOUND_IMG_COLUMN],
});

const NOT_FOUND = createElement({
  tagname: 'section',
  options: [['className', 'd-flex align-items-center']],
  childElements: [NOT_FOUND_CONTAINER],
});

export default NOT_FOUND;
