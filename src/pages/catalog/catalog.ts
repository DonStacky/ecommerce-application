import { createElement } from '../../shared/helpers/dom-utilites';
import { BREADCRUMB } from './breadcrumb';
import CONTENT from './content';
import { SEARCH_BAR } from './search-form';
import 'bootstrap';
import ACCORDION from './side-bar';
import { PAGE_NAVIGATION } from './page-navigation';

const CATALOG_PAGE = createElement({
  tagname: 'section',
  options: [['className', 'catalog']],
  childElements: [
    SEARCH_BAR,
    BREADCRUMB,
    createElement({
      tagname: 'div',
      options: [['className', 'd-flex']],
      childElements: [ACCORDION, CONTENT],
    }),
    PAGE_NAVIGATION,
  ],
});

export default CATALOG_PAGE;
