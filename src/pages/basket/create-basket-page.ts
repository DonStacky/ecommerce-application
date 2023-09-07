import { createElementBase } from '../../shared/helpers/dom-utilites';

export default class BasketPage {
  LIST: HTMLOListElement;

  constructor() {
    this.LIST = createElementBase('ol', ['list-group', 'list-group-numbered']);
    this.createListItem();
  }

  private createListItem() {
    for (let i = 0; i < 10; i += 1) {
      const LIST_ITEM = createElementBase('li', [
        'list-group-item',
        'd-flex',
        'justify-content-between',
        'align-items-start',
      ]);
      const PRODUCT_CONTAINER = createElementBase('div', ['ms-2', 'me-auto']);
      const PRODUCT_NAME = createElementBase('div', ['fw-bold'], undefined, 'Product Name');
      const PRODUCT_COUNT = createElementBase('span', ['badge', 'bg-primary', 'rounded-pill'], undefined, '10');

      PRODUCT_CONTAINER.append(PRODUCT_NAME, 'Some price');
      LIST_ITEM.append(PRODUCT_CONTAINER, PRODUCT_COUNT);
      this.LIST.append(LIST_ITEM);
    }
  }
}
