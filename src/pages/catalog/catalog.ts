import { createElement } from '../../shared/helpers/dom-utilites';
// import { ACCORDION } from './side-bar';
import { SEARCH_BAR } from './search-form';
import 'bootstrap';

// const CATALOG_TITLE = createElement({
//   tagname: 'h1',
//   options: [['textContent', 'There will be a "Catalog" page']],
// });

const CATALOG_PAGE = createElement({
  tagname: 'section',
  options: [['className', 'catalog']],
  childElements: [
    /* CATALOG_TITLE */
    SEARCH_BAR,
  ],
});

export default CATALOG_PAGE;
