import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import buildCommonClient from '../../shared/api/create-common-client';
import { createElementBase } from '../../shared/helpers/dom-utilites';
import checkEnvVariables from '../../shared/helpers/utilites';

export default class BasketPage {
  LIST: HTMLOListElement;

  PAGE: HTMLDivElement;

  constructor() {
    this.PAGE = createElementBase('div', ['container']);
    this.LIST = createElementBase('ol', ['list-group', 'list-group-numbered']);

    this.createListItem();
    this.PAGE.append(this.LIST);
    this.getBusket();
  }

  private createListItem() {
    for (let i = 0; i < 10; i += 1) {
      const LIST_ITEM = createElementBase('li', ['row', 'list-item', 'justify-content-end', 'align-items-center']);
      const IMAGE = createElementBase('img', ['image', 'col-1']);
      const PRODUCT_CONTAINER = createElementBase('div', ['col-6', 'align-self-center']);
      const PRODUCT_NAME = createElementBase('div', ['fw-bold'], undefined, 'Product Name');

      const COUNT = createElementBase('div', ['count', 'col-3', 'justify-content-center', 'align-self-center']);
      const COUNT_BUTTON_MIN = createElementBase('button', ['btn', 'btn-outline-secondary'], undefined, '➖');
      const COUNT_NUMBER = createElementBase('input', ['count-input']);
      const COUNT_BUTTON_MAX = createElementBase('button', ['btn', 'btn-outline-secondary'], undefined, '➕');

      const PRODUCT_SUMM = createElementBase(
        'div',
        ['text-primary', 'fw-bold', 'col-1', 'align-self-center', 'text-center'],
        undefined,
        '63$'
      );
      const BUTTON_REMOOVE = createElementBase('button', ['btn-close', 'align-self-center']);

      IMAGE.setAttribute(
        'src',
        'https://0c240af1963fad93b719-bc209591e5335ab6ad96cc4e979cdbd3.ssl.cf3.rackcdn.com/3-x8E11kN2.jpg'
      );
      IMAGE.setAttribute('width', '5%');
      COUNT_BUTTON_MIN.setAttribute('type', 'button');
      COUNT_NUMBER.setAttribute('type', 'text');
      COUNT_NUMBER.setAttribute('value', '5');
      COUNT_BUTTON_MAX.setAttribute('type', 'button');
      BUTTON_REMOOVE.setAttribute('aria-label', 'remoove');
      PRODUCT_CONTAINER.append(PRODUCT_NAME, '12$');
      COUNT.append(COUNT_BUTTON_MIN, COUNT_NUMBER, COUNT_BUTTON_MAX);
      LIST_ITEM.append(IMAGE, PRODUCT_CONTAINER, COUNT, PRODUCT_SUMM, BUTTON_REMOOVE);
      this.LIST.append(LIST_ITEM);
    }
  }

  private getBusket() {
    const ctpClient = buildCommonClient();
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
    });

    apiRoot
      .carts()
      .get()
      /* .get({
        queryArgs: {
          id: '33503b72-97cd-4c71-aec6-340f94f3940a',
        },
      }) */
      .execute()
      .then((data) => {
        console.log(data);
      });
  }
}
