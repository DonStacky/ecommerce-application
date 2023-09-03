import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import buildCommonClient from '../../shared/api/create-common-client';
import checkEnvVariables from '../../shared/helpers/utilites';
import { SearchInput } from '../../shared/types/types';
import createCard from './card';
import CONTENT from './content';
import NOT_FOUND from '@svg/no-result.svg';
import { createElement } from '../../shared/helpers/dom-utilites';

const CATEGORY_NAME_ID_MAP: { [name: string]: string } = {};

const ctpClient = buildCommonClient();
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
});

apiRoot
  .categories()
  .get({
    queryArgs: {
      limit: 30,
    },
  })
  .execute()
  .then((data) => {
    data.body.results.forEach((res) => Object.defineProperty(CATEGORY_NAME_ID_MAP, res.name.en, { value: res.id }));
  });

export default async function search(searchInput: SearchInput) {
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

  root
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit: 30,
        'text.en': `${searchTextInput || ''}`,
        filter: mappedArr,
        sort,
      },
    })
    .execute()
    .then((data) => {
      const result = data.body.results.reduce((acc, cur) => {
        acc.push(createCard(cur));
        return acc;
      }, new Array<HTMLDivElement>(0));
      return result;
    })
    .then((cards) => {
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
    });
}
