import { createElement } from '../../shared/helpers/dom-utilites';
import CONTENT from './content';
import { SEARCH_BAR } from './search-form';
import 'bootstrap';

const CATALOG_PAGE = createElement({
  tagname: 'section',
  options: [['className', 'catalog']],
  childElements: [SEARCH_BAR, CONTENT],
});

export default CATALOG_PAGE;
