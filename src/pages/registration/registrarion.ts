import { createElement } from '../../shared/helpers/dom-utilites';

const REG_TITLE = createElement({
  tagname: 'h1',
  options: [['textContent', 'There will be a "Registration" page']],
});

const REG_PAGE = createElement({
  tagname: 'section',
  options: [['className', 'registration d-flex justify-content-center align-items-center']],
  childElements: [REG_TITLE],
});

export default REG_PAGE;
