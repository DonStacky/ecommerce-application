import { createElement } from '../../shared/helpers/dom-utilites';

const BASKET_TITLE = createElement({
  tagname: 'h1',
  options: [['textContent', 'There will be a "Basket" page']],
});

const BASKET_PAGE = createElement({
  tagname: 'section',
  options: [['className', 'basket d-flex justify-content-center align-items-center']],
  childElements: [BASKET_TITLE],
});

export default BASKET_PAGE;
