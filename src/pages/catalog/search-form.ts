import { createElement } from '../../shared/helpers/dom-utilites';
import { InputTemplate, Order, SearchInput } from '../../shared/types/types';
import { showBreadCrumb } from './breadcrumb';
import search from './product-search';

export const RAW_INPUT: InputTemplate = {
  seasons: [],
  materials: [],
  productType: [],
  searchTextInput: [],
  sort: [],
  price: [],
};

export const buildSearchInput = (): SearchInput => {
  const resultInput = {};
  const sorts = ['price', 'name.en'];

  Object.defineProperty(resultInput, 'seasons', {
    value: RAW_INPUT.seasons.filter(([input]) => input.checked).map(([, string]) => string),
  });
  Object.defineProperty(resultInput, 'materials', {
    value: RAW_INPUT.materials.filter(([input]) => input.checked).map(([, string]) => string),
  });
  Object.defineProperty(resultInput, 'productType', {
    value: RAW_INPUT.productType.filter(([input]) => input.checked).map(([, string]) => string),
  });
  Object.defineProperty(resultInput, 'searchTextInput', { value: RAW_INPUT.searchTextInput[0].value });

  const entries = RAW_INPUT.sort.reduce((acc, cur, idx) => {
    if (cur[0].checked) {
      acc.push(`${sorts[idx]} ${cur[1].checked ? Order.asc : Order.desc}`);
    }
    return acc;
  }, new Array<string>(0));
  Object.defineProperty(resultInput, 'sort', { value: entries });

  if (+RAW_INPUT.price[0].value > 0 || +RAW_INPUT.price[1].value > 0) {
    Object.defineProperty(resultInput, 'price', {
      value: `variants.price.centAmount:range (${
        +RAW_INPUT.price[0].value > 0 ? +RAW_INPUT.price[0].value * 100 : '*'
      } to ${+RAW_INPUT.price[1].value > 0 ? +RAW_INPUT.price[1].value * 100 : '*'})`,
    });
  }
  console.log(resultInput);
  return resultInput;
};

const SEARCH_FORM = createElement({
  tagname: 'form',
  options: [['className', 'search-form']],
  events: [
    [
      'submit',
      (event) => {
        event.preventDefault();
        search(buildSearchInput());
        showBreadCrumb(['All', 'Custom Search']);
      },
    ],
  ],
});

const SEARCH_INPUT = createElement({
  tagname: 'input',
  options: [
    ['className', 'form-control mr-sm-2'],
    ['type', 'search'],
    ['placeholder', 'Search'],
    ['ariaLabel', 'Search'],
  ],
});
RAW_INPUT.searchTextInput.push(SEARCH_INPUT);

const SEARCH_BUTTON = createElement({
  tagname: 'button',
  options: [
    ['className', 'btn btn-outline-success my-2 my-sm-0 mx-2'],
    ['type', 'submit'],
    ['textContent', 'Search'],
  ],
});

const FILTER_BUTTON = createElement({
  tagname: 'button',
  options: [
    ['className', 'btn btn-outline-success my-2 my-sm-0 mx-2 filter'],
    ['type', 'button'],
  ],
});

const CONTROLS = createElement({
  tagname: 'div',
  options: [['className', 'd-flex controls']],
  childElements: [SEARCH_INPUT, SEARCH_BUTTON, FILTER_BUTTON],
});

const createCategoriesButtonCheckbox = (
  className: string,
  textContent: string,
  inputField: keyof Pick<InputTemplate, 'seasons' | 'materials' | 'productType'>
) => {
  const checkbox = createElement({
    tagname: 'input',
    options: [
      ['type', 'checkbox'],
      ['className', 'category'],
    ],
  });

  RAW_INPUT[inputField].push([checkbox, textContent.toLowerCase()]);

  return createElement({
    tagname: 'label',
    options: [
      ['className', className],
      ['textContent', textContent],
    ],
    childElements: [checkbox],
  });
};

const SEASONS = createElement({
  tagname: 'div',
  options: [['className', 'category-container']],
  childElements: [
    createElement({
      tagname: 'h2',
      options: [
        ['className', 'category-header'],
        ['textContent', 'Seasons'],
      ],
    }),
    ...['Winter', 'Spring', 'Summer', 'Autumn'].map((season) =>
      createCategoriesButtonCheckbox('btn season-category', season, 'seasons')
    ),
  ],
});

const MATERIALS = createElement({
  tagname: 'div',
  options: [['className', 'category-container']],
  childElements: [
    createElement({
      tagname: 'h2',
      options: [
        ['className', 'category-header'],
        ['textContent', 'Materials'],
      ],
    }),
    ...['Wood', 'Plywood', 'Wax'].map((material) =>
      createCategoriesButtonCheckbox('btn materials-category', material, 'materials')
    ),
  ],
});

const PRODUCT_TYPE = createElement({
  tagname: 'div',
  options: [['className', 'category-container']],
  childElements: [
    createElement({
      tagname: 'h2',
      options: [
        ['className', 'category-header'],
        ['textContent', 'Product type'],
      ],
    }),
    ...[
      'Calendar',
      'Candles',
      'Candlestick',
      'Den',
      'Figures',
      'Key holder',
      'Lantern',
      'Nampkin rings',
      'Photo holder',
      'Stand',
      'Wall decorations',
      'Wreath',
    ].map((productType) => createCategoriesButtonCheckbox('btn product-type-category', productType, 'productType')),
  ],
});
const categories = [SEASONS, MATERIALS, PRODUCT_TYPE].map((category) =>
  createElement({
    tagname: 'div',
    options: [['className', 'category-container']],
    childElements: [category],
  })
);

const SORT_BY_PRICE_HEADER = createElement({
  tagname: 'h2',
  options: [
    ['textContent', 'Sort by price'],
    ['className', 'category-header'],
  ],
});
const SORT_BY_NAME_HEADER = createElement({
  tagname: 'h2',
  options: [
    ['textContent', 'Sort by name'],
    ['className', 'category-header'],
  ],
});

const PRICE_SORT_INPUT = createElement({
  tagname: 'input',
  options: [
    ['type', 'checkbox'],
    ['className', 'category'],
  ],
});
const PRICE_SORT_LABEL = createElement({
  tagname: 'label',
  options: [
    ['className', 'btn sort-category'],
    ['textContent', 'Enable sort by price'],
  ],
  childElements: [PRICE_SORT_INPUT],
});
const NAME_SORT_INPUT = createElement({
  tagname: 'input',
  options: [
    ['type', 'checkbox'],
    ['className', 'category'],
  ],
});

const NAME_SORT_LABEL = createElement({
  tagname: 'label',
  options: [
    ['className', 'btn sort-category'],
    ['textContent', 'Enable sort by name'],
  ],
  childElements: [NAME_SORT_INPUT],
});

const PRICE_ORDER_INPUT = createElement({
  tagname: 'input',
  options: [
    ['type', 'checkbox'],
    ['className', 'category'],
  ],
});
const PRICE_ORDER_LABEL = createElement({
  tagname: 'label',
  options: [
    ['className', 'btn sort-button'],
    ['textContent', 'Sort type '],
  ],
  childElements: [PRICE_ORDER_INPUT],
});
const NAME_ORDER_INPUT = createElement({
  tagname: 'input',
  options: [
    ['type', 'checkbox'],
    ['className', 'category'],
  ],
});

const NAME_ORDER_LABEL = createElement({
  tagname: 'label',
  options: [
    ['className', 'btn sort-button'],
    ['textContent', 'Sort type '],
  ],
  childElements: [NAME_ORDER_INPUT],
});

RAW_INPUT.sort.push([PRICE_SORT_INPUT, PRICE_ORDER_INPUT], [NAME_SORT_INPUT, NAME_ORDER_INPUT]);

const PRICE_SORT_CATEGORY = createElement({
  tagname: 'div',
  options: [['className', 'category-container']],
  childElements: [SORT_BY_PRICE_HEADER, PRICE_SORT_LABEL, PRICE_ORDER_LABEL],
});

const NAME_SORT_CATEGORY = createElement({
  tagname: 'div',
  options: [['className', 'category-container']],
  childElements: [SORT_BY_NAME_HEADER, NAME_SORT_LABEL, NAME_ORDER_LABEL],
});

const PRICE_MIN_INPUT = createElement({
  tagname: 'input',
  options: [
    ['type', 'number'],
    ['step', 0.01],
    ['className', 'form-control'],
    ['ariaLabel', 'Amount (to the nearest dollar)'],
  ],
});

const PRICE_MAX_INPUT = createElement({
  tagname: 'input',
  options: [
    ['type', 'number'],
    ['step', 0.01],
    ['className', 'form-control'],
    ['ariaLabel', 'Amount (to the nearest dollar)'],
  ],
});

RAW_INPUT.price.push(PRICE_MIN_INPUT, PRICE_MAX_INPUT);

const MIN_PRICE_FIELD = createElement({
  tagname: 'div',
  options: [['className', 'input-group mb-3"']],
  childElements: [
    createElement({
      tagname: 'span',
      options: [
        ['className', 'input-group-text'],
        ['textContent', 'Min price $'],
      ],
    }),
    PRICE_MIN_INPUT,
    createElement({
      tagname: 'span',
      options: [
        ['className', 'input-group-text'],
        ['textContent', '.00'],
      ],
    }),
  ],
});

const MAX_PRICE_FIELD = createElement({
  tagname: 'div',
  options: [['className', 'input-group mb-3"']],
  childElements: [
    createElement({
      tagname: 'span',
      options: [
        ['className', 'input-group-text'],
        ['textContent', 'Max price $'],
      ],
    }),
    PRICE_MAX_INPUT,
    createElement({
      tagname: 'span',
      options: [
        ['className', 'input-group-text'],
        ['textContent', '.00'],
      ],
    }),
  ],
});

const PRICE_CONTAINER = createElement({
  tagname: 'div',
  options: [['className', 'category-container']],
  childElements: [
    createElement({
      tagname: 'h2',
      options: [
        ['className', 'category-header'],
        ['textContent', 'Select Price'],
      ],
    }),
    MIN_PRICE_FIELD,
    MAX_PRICE_FIELD,
  ],
});

const SECONDARY_CONTROLS = createElement({
  tagname: 'div',
  options: [['className', 'category-container']],
  childElements: [
    createElement({
      tagname: 'button',
      options: [
        ['className', 'btn btn-success'],
        ['type', 'submit'],
        ['textContent', 'Search'],
      ],
    }),
    createElement({
      tagname: 'button',
      options: [
        ['className', 'btn btn-danger'],
        ['textContent', 'Reset'],
        ['type', 'reset'],
      ],
    }),
  ],
});

const FILTERS = createElement({
  tagname: 'div',
  options: [['className', 'filters']],
  childElements: [...categories, PRICE_SORT_CATEGORY, NAME_SORT_CATEGORY, PRICE_CONTAINER, SECONDARY_CONTROLS],
});

FILTER_BUTTON.addEventListener('click', () => {
  FILTERS.classList.toggle('filters-show');
});
SEARCH_FORM.append(CONTROLS, FILTERS);
export const SEARCH_BAR = createElement({
  tagname: 'nav',
  options: [['className', 'navbar navbar-light my-search-form']],
  childElements: [SEARCH_FORM],
});

document.body.addEventListener('click', (event) => {
  if (event.target instanceof Node && !SEARCH_FORM.contains(event.target)) {
    FILTERS.classList.remove('filters-show');
  }
});
