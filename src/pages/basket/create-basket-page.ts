import { Cart } from '@commercetools/platform-sdk';
import { changeLineItemQuantity, getCart } from '../../shared/api/for-carts-and-lineItems';
import { createElementBase, findDomElement, findDomElements } from '../../shared/helpers/dom-utilites';
import showModal from '../../shared/modal/modal-window';
import { checkCartLineItemsQty } from '../detailed/cart-interaction';

export default class BasketPage {
  LIST: HTMLOListElement;

  PAGE: HTMLDivElement;

  constructor(cart?: Cart) {
    this.PAGE = createElementBase('div', ['container', 'container_margin'], 'basketPage');
    this.LIST = createElementBase('ol', ['list-group', 'list-group-numbered']);

    this.createListItem(cart);
    this.PAGE.append(this.LIST);
    this.addEvents();
  }

  private async createListItem(cart?: Cart) {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) return;

    const { lineItems } = cart || (await getCart(cartId)).body;
    const names = lineItems.map((item) => item.name.en);
    const prices = lineItems.map((item) => {
      const price = item.price.discounted?.value.centAmount || item.price.value.centAmount;
      if (price % 100 === 0) return `${price / 100}.00`;
      if (price % 10 === 0) return `${price / 100}0`;
      return `${price / 100}`;
    });
    const totalPrices = lineItems.map((item) => {
      const price = item.totalPrice.centAmount;
      if (price % 100 === 0) return `${price / 100}.00`;
      if (price % 10 === 0) return `${price / 100}0`;
      return `${price / 100}`;
    });
    const counts = lineItems.map((item) => item.quantity);
    const images = lineItems.map((item) => {
      const img = item.variant.images;
      if (img) {
        return img[0].url;
      }
      return '';
    });
    const productId = lineItems.map((item) => item.id);

    for (let i = 0; i < lineItems.length; i += 1) {
      const LIST_ITEM = createElementBase(
        'li',
        ['row', 'list-item', 'justify-content-end', 'align-items-center'],
        productId[i]
      );
      const IMAGE = createElementBase('img', ['image', 'col-1']);
      const PRODUCT_CONTAINER = createElementBase('div', ['col-6', 'align-self-center']);
      const PRODUCT_NAME = createElementBase('div', ['fw-bold'], undefined, names[i]);

      const COUNT = createElementBase('div', ['count', 'col-3', 'justify-content-center', 'align-self-center']);
      const COUNT_BUTTON_MIN = createElementBase(
        'button',
        ['btn_min', 'btn', 'btn-outline-secondary'],
        undefined,
        '➖'
      );
      const COUNT_NUMBER = createElementBase('input', ['count-input']);
      const COUNT_BUTTON_MAX = createElementBase(
        'button',
        ['btn_max', 'btn', 'btn-outline-secondary'],
        undefined,
        '➕'
      );

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

    // this.addLineItem('8819f50c-9ab5-4ea8-8bb9-28def524d828', '7ace79b2-132b-44a4-97d6-ec04fc0d88a4', 110);
  }

  private addEvents() {
    // Запрещаем вводить не цифры
    this.LIST.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.classList[0] !== 'count-input') return;

      target.value = target.value.replace(/[^\d]/g, '');
    });

    // Ввод по нажатию на enter
    this.LIST.addEventListener('keydown', (event: KeyboardEvent) => {
      const target = event.target as HTMLInputElement;
      const enterButtonKey = 13;
      if (target.classList[0] !== 'count-input' || event.keyCode !== enterButtonKey) return;
      this.desableButtons();
      this.changeQuantity(target).catch((error: Error) => {
        showModal(false, error.message);
        this.enableButtons();
      });
    });

    this.LIST.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLInputElement;
      if (target.classList[0] !== 'btn_min' && target.classList[0] !== 'btn_max') return;

      const COUNT = target.closest('.count');
      if (!COUNT) return;

      const COUNT_INPUT = findDomElement<'input'>(COUNT as HTMLDivElement, '.count-input');

      if (target.classList[0] === 'btn_min') {
        COUNT_INPUT.value = `${+COUNT_INPUT.value - 1}`;

        this.desableButtons();
        this.changeQuantity(COUNT_INPUT).catch((error: Error) => {
          showModal(false, error.message);
          this.enableButtons();
          COUNT_INPUT.value = `${+COUNT_INPUT.value + 1}`;
        });
      }

      if (target.classList[0] === 'btn_max') {
        COUNT_INPUT.value = `${+COUNT_INPUT.value + 1}`;

        this.desableButtons();
        this.changeQuantity(COUNT_INPUT).catch((error: Error) => {
          showModal(false, error.message);
          this.enableButtons();
          COUNT_INPUT.value = `${+COUNT_INPUT.value - 1}`;
        });
      }
    });
  }

  private async changeQuantity(element: HTMLInputElement) {
    const cartId = localStorage.getItem('cartId');
    const cartVersion = localStorage.getItem('cartVersion');
    const LIST = element.closest('li');
    if (!cartId || !LIST || !cartVersion) return;

    const productId = LIST.id;
    const { body } = await changeLineItemQuantity(cartId, productId, +cartVersion, +element.value);
    this.setCartInLocalStorage(body);
    this.replasePage(body);
    checkCartLineItemsQty(body);
  }

  private setCartInLocalStorage(body: Cart) {
    localStorage.setItem('cartId', body.id);
    localStorage.setItem('cartVersion', body.version.toString());
  }

  private replasePage(cart?: Cart) {
    const PAGE = findDomElement(document.body, '#basketPage');

    PAGE.replaceWith(new BasketPage(cart).PAGE);
  }

  private desableButtons() {
    const buttons = findDomElements<'button'>(this.LIST, 'button');
    buttons.forEach((item) => item.classList.add('disabled'));
  }

  private enableButtons() {
    const buttons = findDomElements<'button'>(this.LIST, 'button');
    buttons.forEach((item) => item.classList.remove('disabled'));
  }
}
