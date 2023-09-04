import { createElement } from '../../shared/helpers/dom-utilites';
import { showBreadCrumb } from './breadcrumb';
import search from './product-search';

const [WINTER_CATEGORY, SPRING_CATEGORY, SUMMER_CATEGORY, AUTUMN_CATEGORY] = [
  'Winter',
  'Spring',
  'Summer',
  'Autumn',
].map((season) => {
  const category = createElement({
    tagname: 'div',
    options: [
      ['textContent', season],
      ['className', 'd-flex btn btn-primary fs-4'],
    ],
  });
  [
    ['data-bs-toggle', 'collapse'],
    ['data-bs-target', `#${season}`.toLowerCase()],
    ['aria-expanded', 'false'],
  ].forEach(([prop, val]) => category.setAttribute(prop, val));
  const subCategory = createElement({
    tagname: 'div',
    options: [
      ['className', 'collapse ms-2'],
      ['id', `${season}`.toLowerCase()],
    ],
    childElements: ['Show All', 'Wood', 'Plywood', 'Wax'].map((material) =>
      createElement({
        tagname: 'div',
        options: [
          ['className', 'ms-1 mb-1 btn btn-secondary'],
          ['textContent', material],
        ],
        events: [
          [
            'click',
            () => {
              search({
                seasons: [`${season}`.toLowerCase()],
                materials: [`${material}`.toLowerCase()],
              });
              showBreadCrumb(['All', ...(material === 'Show All' ? [season] : [season, material])]);
            },
          ],
        ],
      })
    ),
  });
  return [category, subCategory];
});

export default createElement({
  tagname: 'aside',
  options: [
    ['className', 'side-bar accordion d-flex flex-column'],
    ['id', 'accordion'],
  ],
  childElements: [...WINTER_CATEGORY, ...SPRING_CATEGORY, ...SUMMER_CATEGORY, ...AUTUMN_CATEGORY],
});
