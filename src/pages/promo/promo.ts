import { createElement } from '../../shared/helpers/dom-utilites';

const PROMO_TITLE = createElement({
  tagname: 'h1',
  options: [['textContent', 'There will be a "Promo" page']],
});

const PROMO_PAGE = createElement({
  tagname: 'section',
  options: [['className', 'about d-flex justify-content-center align-items-center']],
  childElements: [PROMO_TITLE],
});

export default PROMO_PAGE;
