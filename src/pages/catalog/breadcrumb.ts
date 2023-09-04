import { createElement } from '../../shared/helpers/dom-utilites';

const ROUTE = createElement({
  tagname: 'ol',
  options: [['className', 'breadcrumb']],
});

export const BREADCRUMB = createElement({
  tagname: 'nav',
  options: [
    ['ariaLabel', 'breadcrumb'],
    ['className', 'ms-3'],
  ],
  childElements: [ROUTE],
});

export function showBreadCrumb(path: string[]) {
  const crumbs = path.reduce((acc, cur, idx) => {
    if (idx !== path.length - 1) {
      acc.push(
        createElement({
          tagname: 'li',
          options: [['className', 'breadcrumb-item']],
          childElements: [
            createElement({
              tagname: 'a',
              options: [
                ['href', `/catalog/${path.slice(0, idx + 1).join('/')}`.toLowerCase()],
                ['textContent', cur],
              ],
            }),
          ],
        })
      );
    } else {
      acc.push(
        createElement({
          tagname: 'li',
          options: [
            ['className', 'breadcrumb-item active'],
            ['ariaCurrent', 'page'],
            ['textContent', cur],
          ],
        })
      );
    }
    return acc;
  }, new Array<HTMLElement>(0));

  ROUTE.replaceChildren(...crumbs);
}
