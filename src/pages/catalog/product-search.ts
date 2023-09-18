import { Cart, QueryParam, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import buildCommonClient from '../../shared/api/create-common-client';
import checkEnvVariables from '../../shared/helpers/utilites';
import { SearchInput } from '../../shared/types/types';
import createCard from './card';
import CONTENT from './content';
import NOT_FOUND from '@svg/no-result.svg';
import { createElement } from '../../shared/helpers/dom-utilites';
import { nextPage, currentPage, prevPage } from './page-navigation';

const CATEGORY_NAME_ID_MAP: { [name: string]: string } = {};
let pageQuantity = 0;
let currentPageNumber = 0;
const cardPerPage = 6;

let searchQueryStorage: { [key: string]: QueryParam } = {};

async function getCategories() {
  const ctpClient = buildCommonClient();
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
  });

  await apiRoot
    .categories()
    .get({
      queryArgs: {
        limit: 30,
      },
    })
    .execute()
    .then((data) => {
      data.body.results.forEach((res) => {
        CATEGORY_NAME_ID_MAP[res.name.en] = res.id;
      });
    });
}

export default async function search(searchInput: SearchInput, isStoredRequest?: boolean) {
  const cart: Cart | null = JSON.parse(localStorage.getItem('MyCart') || 'null');
  console.log('currentPage', currentPageNumber);

  const blur = createElement({
    tagname: 'div',
    options: [
      ['className', 'blur'],
      [
        'innerHTML',
        `<div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span>
</div>`,
      ],
    ],
  });

  CONTENT.prepend(blur);

  if (!Object.keys(CATEGORY_NAME_ID_MAP).length) {
    await getCategories();
  }
  const { seasons, materials, productType, sort, searchTextInput, price } = searchInput;
  const filterWrapper = 'categories.id:';
  const arr = [seasons, materials, productType].map((e) => e || []);
  const mappedArr = arr
    .map((catType) =>
      catType
        .map((name) => CATEGORY_NAME_ID_MAP[name.toLocaleLowerCase()] || '')
        .filter((e) => e)
        .map((e) => `"${e}"`)
    )
    .map((cat) => (cat.length ? `${filterWrapper}${cat.join(',')}` : ''))
    .filter((cat) => cat);
  if (price) {
    mappedArr.push(price);
  }
  const client = buildCommonClient();
  const root = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
  });

  if (!isStoredRequest) {
    currentPageNumber = 0;
    searchQueryStorage = {
      limit: cardPerPage,
      'text.en': `${searchTextInput || ''}`,
      filter: mappedArr,
      sort,
      offset: cardPerPage * currentPageNumber,
    };
  }

  const { results: productsData, total } = (
    await root
      .productProjections()
      .search()
      .get({
        queryArgs: isStoredRequest
          ? searchQueryStorage
          : {
              limit: cardPerPage,
              'text.en': `${searchTextInput || ''}`,
              filter: mappedArr,
              sort,
              offset: cardPerPage * currentPageNumber,
            },
      })
      .execute()
  ).body;

  pageQuantity = Math.ceil((total || 0) / cardPerPage);

  if (!currentPageNumber) {
    prevPage.classList.add('disabled');
  } else {
    prevPage.classList.remove('disabled');
  }
  if (!pageQuantity || pageQuantity === currentPageNumber + 1) {
    nextPage.classList.add('disabled');
  } else {
    nextPage.classList.remove('disabled');
  }

  currentPage.textContent = `${currentPageNumber + 1} of ${pageQuantity || 1}`;

  const cards = productsData.reduce((acc, cur, idx) => {
    acc.push(createCard(cur, !!cart?.lineItems.filter((item) => item.productId === productsData[idx].id).length));
    return acc;
  }, new Array<HTMLDivElement>(0));

  if (cards.length) {
    CONTENT.replaceChildren(...cards);
    CONTENT.classList.remove('content-not-found');
  } else {
    CONTENT.replaceChildren(
      createElement({
        tagname: 'img',
        options: [
          ['src', NOT_FOUND],
          ['className', 'aside__image'],
          ['alt', 'Page not found'],
        ],
      }),
      createElement({
        tagname: 'div',
        options: [
          ['textContent', 'Found 0 results'],
          ['className', 'fs-3'],
        ],
      })
    );
    CONTENT.classList.add('content-not-found');
  }
}

function showNextPage(this: HTMLElement) {
  if (!this.classList.contains('disabled')) {
    currentPageNumber += 1;
    searchQueryStorage.offset = cardPerPage * currentPageNumber;
  }
  search({}, true);
}

function showPrevPage(this: HTMLElement) {
  if (!this.classList.contains('disabled')) {
    currentPageNumber += -1;
    searchQueryStorage.offset = cardPerPage * currentPageNumber;
  }
  search({}, true);
}

prevPage.addEventListener('click', showPrevPage);
nextPage.addEventListener('click', showNextPage);
