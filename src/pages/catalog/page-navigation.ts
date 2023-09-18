import { createElement } from '../../shared/helpers/dom-utilites';

export const prevPage = createElement({
  tagname: 'li',
  options: [
    ['textContent', 'Previous'],
    ['classList', 'btn btn-secondary page-item page-link'],
  ],
});

export const nextPage = createElement({
  tagname: 'li',
  options: [
    ['textContent', 'Next'],
    ['classList', 'btn btn-secondary page-item page-link'],
  ],
});

export const currentPage = createElement({
  tagname: 'li',
  options: [
    ['textContent', '2 of 10'],
    ['classList', 'page-item page-link'],
  ],
});

export const PAGE_NAVIGATION = createElement({
  tagname: 'ul',
  options: [['className', 'pagination justify-content-center']],
  childElements: [prevPage, currentPage, nextPage],
});
