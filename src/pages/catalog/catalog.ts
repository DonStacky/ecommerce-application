import { createElement } from '../../shared/helpers/dom-utilites';
import { BREADCRUMB } from './breadcrumb';
import CONTENT from './content';
import { SEARCH_BAR } from './search-form';
import 'bootstrap';

const CATALOG_PAGE = createElement({
  tagname: 'section',
  options: [['className', 'catalog']],
  childElements: [SEARCH_BAR, BREADCRUMB, CONTENT],
});

export default CATALOG_PAGE;
