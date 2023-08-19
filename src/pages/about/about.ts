import { createElement } from '../../shared/helpers/dom-utilites';

const ABOUT_TITLE = createElement({
  tagname: 'h1',
  options: [['textContent', 'There will be an "About us" page']],
});

const ABOUT_PAGE = createElement({
  tagname: 'section',
  options: [['className', 'about d-flex justify-content-center']],
  childElements: [ABOUT_TITLE],
});

export default ABOUT_PAGE;
