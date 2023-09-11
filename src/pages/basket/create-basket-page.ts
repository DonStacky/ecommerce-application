import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import buildCommonClient from '../../shared/api/create-common-client';
import { createElementBase } from '../../shared/helpers/dom-utilites';
import checkEnvVariables from '../../shared/helpers/utilites';
import { getCart } from '../detailed/detailed-data';

export default class BasketPage {
  LIST: HTMLOListElement;

  PAGE: HTMLDivElement;

  constructor() {
    this.PAGE = createElementBase('div', ['container', 'container_margin']);
    this.LIST = createElementBase('ol', ['list-group', 'list-group-numbered']);

    this.createListItem();
    this.PAGE.append(this.LIST);
  }

  private async createListItem() {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) return;

    const { lineItems } = (await getCart(cartId)).body;
    console.log(lineItems);
    const names = lineItems.map((item) => item.name.en);
    const prices = lineItems.map((item) => {
      const price = item.price.discounted?.value.centAmount || item.price.value.centAmount;
      if (price % 100 === 0) return `${price / 100}.00`;
      if (price % 10 === 0) return `${price / 100}0`;
      return price / 100;
    });
    const totalPrices = lineItems.map((item) => {
      const price = item.totalPrice.centAmount;
      if (price % 100 === 0) return `${price / 100}.00`;
      if (price % 10 === 0) return `${price / 100}0`;
      return price / 100;
    });
    const counts = lineItems.map((item) => item.quantity);
    const images = lineItems.map((item) => {
      const img = item.variant.images;
      if (img) {
        return img[0].url;
      }
      return '';
    });

    for (let i = 0; i < lineItems.length; i += 1) {
      const LIST_ITEM = createElementBase('li', ['row', 'list-item', 'justify-content-end', 'align-items-center']);
      const IMAGE = createElementBase('img', ['image', 'col-1']);
      const PRODUCT_CONTAINER = createElementBase('div', ['col-6', 'align-self-center']);
      const PRODUCT_NAME = createElementBase('div', ['fw-bold'], undefined, names[i]);

      const COUNT = createElementBase('div', ['count', 'col-3', 'justify-content-center', 'align-self-center']);
      const COUNT_BUTTON_MIN = createElementBase('button', ['btn', 'btn-outline-secondary'], undefined, '➖');
      const COUNT_NUMBER = createElementBase('input', ['count-input']);
      const COUNT_BUTTON_MAX = createElementBase('button', ['btn', 'btn-outline-secondary'], undefined, '➕');

      const PRODUCT_SUMM = createElementBase(
        'div',
        ['text-primary', 'fw-bold', 'col-1', 'align-self-center', 'text-center'],
        undefined,
        `${totalPrices[i]}`
      );
      const BUTTON_REMOOVE = createElementBase('button', ['btn-close', 'align-self-center']);

      IMAGE.setAttribute('src', images[i]);
      IMAGE.setAttribute('width', '5%');
      COUNT_BUTTON_MIN.setAttribute('type', 'button');
      COUNT_NUMBER.setAttribute('type', 'text');
      COUNT_NUMBER.setAttribute('value', `${counts[i]}`);
      COUNT_BUTTON_MAX.setAttribute('type', 'button');
      BUTTON_REMOOVE.setAttribute('aria-label', 'remoove');
      PRODUCT_CONTAINER.append(PRODUCT_NAME, `${prices[i]}`);
      COUNT.append(COUNT_BUTTON_MIN, COUNT_NUMBER, COUNT_BUTTON_MAX);
      LIST_ITEM.append(IMAGE, PRODUCT_CONTAINER, COUNT, PRODUCT_SUMM, BUTTON_REMOOVE);
      this.LIST.append(LIST_ITEM);
    }

    this.addLineItem('8819f50c-9ab5-4ea8-8bb9-28def524d828', '7ace79b2-132b-44a4-97d6-ec04fc0d88a4', 110);
  }

  addLineItem(ID: string, lineItemId: string, cartVersion: number) {
    const ctpClient = buildCommonClient();
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
    });

    return apiRoot
      .me()
      .carts()
      .withId({ ID })
      .post({
        body: {
          version: cartVersion,
          actions: [
            {
              action: 'changeLineItemQuantity',
              lineItemId,
              quantity: 10,
            },
          ],
        },
      })
      .execute();
  }
}
