import { createElement } from '../../shared/helpers/dom-utilites';

export const prevPage = createElement({
  tagname: 'button',
  options: [
    ['textContent', 'Previous'],
    ['className', 'btn btn-secondary page-link fs-2'],
  ],
});

export const nextPage = createElement({
  tagname: 'button',
  options: [
    ['textContent', 'Next'],
    ['className', 'btn btn-secondary page-link fs-2'],
  ],
});

export const currentPage = createElement({
  tagname: 'li',
  options: [['className', 'page-item page-link fs-2']],
});

export const PAGE_NAVIGATION = createElement({
  tagname: 'ul',
  options: [['className', 'pagination justify-content-center']],
  childElements: [
    createElement({ tagname: 'li', options: [['className', 'page-item']], childElements: [prevPage] }),
    currentPage,
    createElement({ tagname: 'li', options: [['className', 'page-item']], childElements: [nextPage] }),
  ],
});
