import { createElement } from '../../shared/helpers/dom-utilites';

const DISCOUNTS_TITLE = createElement({
  tagname: 'h1',
  options: [['textContent', 'There will be a "Discounts" page']],
});

const DISCOUNTS_PAGE = createElement({
  tagname: 'section',
  options: [['className', 'about d-flex justify-content-center align-items-center']],
  childElements: [DISCOUNTS_TITLE],
});

export default DISCOUNTS_PAGE;
