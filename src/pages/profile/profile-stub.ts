import { createElement } from '../../shared/helpers/dom-utilites';

const PROFILE_TITLE = createElement({
  tagname: 'h1',
  options: [['textContent', 'There will be a "Profile" page']],
});

const PROFILE_PAGE = createElement({
  tagname: 'section',
  options: [['className', 'd-flex justify-content-center align-items-center']],
  childElements: [PROFILE_TITLE],
});

export default PROFILE_PAGE;
