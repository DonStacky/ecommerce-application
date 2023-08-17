import { createElement } from '../../shared/helpers/dom-utilites';

const CATALOG_TITLE = createElement({
  tagname: 'h1',
  options: [['textContent', 'There will be a "Catalog" page']],
});

const CATALOG_PAGE = createElement({
  tagname: 'section',
  options: [['className', 'catalog d-flex justify-content-center align-items-center']],
  childElements: [CATALOG_TITLE],
});

export default CATALOG_PAGE;
