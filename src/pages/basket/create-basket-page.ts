import { Cart } from '@commercetools/platform-sdk';
import {
  addDiscountCode,
  changeLineItemQuantity,
  deleteCart,
  getCart,
  removeLineItem,
} from '../../shared/api/for-carts-and-lineItems';
import { createElementBase, findDomElement, findDomElements } from '../../shared/helpers/dom-utilites';
import showModal from '../../shared/modal/modal-window';
import CONTENT from '../catalog/content';
import { checkCartLineItemsQty } from '../detailed/cart-interaction';
import BusketModal from './busket-modal';

export default class BasketPage {
  LIST: HTMLOListElement;

  PAGE: HTMLDivElement;

  TOTAL_CONTAINER: HTMLDivElement;

  TOTAL_TITLE: HTMLDivElement;

  TOTAL_PRICE: HTMLDivElement;

  total: string;

  DELETE_BUTTON: HTMLButtonElement;

  DELETE_BUTTON_CONTAINER: HTMLDivElement;

  modal: BusketModal;

  TOTAL_PRICE_THROUGH: HTMLDivElement;

  TOTAL_PRICE_THROUGH_CONTAINER: HTMLDivElement;

  DISCOUNT_CONTAINER: HTMLDivElement;

  DISCOUNT_TITLE: HTMLDivElement;

  DISCOUNT_INPUT: HTMLInputElement;

  DISCOUNT_BUTTON: HTMLButtonElement;

  constructor(cart?: Cart) {
    this.total = '0';

    this.PAGE = createElementBase('div', ['container', 'container_margin'], 'basketPage');
    this.LIST = createElementBase('ol', ['list-group', 'list-group-numbered']);
    this.TOTAL_CONTAINER = createElementBase('div', ['d-flex', 'justify-content-end', 'me-10']);
    this.TOTAL_TITLE = createElementBase('div', ['fw-bold'], undefined, 'Total:');
    this.TOTAL_PRICE = createElementBase('div', ['text-primary', 'fw-bold', 'ms-3']);
    this.TOTAL_PRICE_THROUGH_CONTAINER = createElementBase('div', ['d-flex', 'justify-content-end', 'me-10']);
    this.TOTAL_PRICE_THROUGH = createElementBase('div', [
      'text-decoration-line-through',
      'small',
      'text-secondary',
      'text-center',
    ]);
    this.DELETE_BUTTON_CONTAINER = createElementBase('div', ['d-flex', 'justify-content-end', 'me-2', 'mb-1']);
    this.DELETE_BUTTON = createElementBase('button', ['btn_max', 'btn', 'btn-danger'], undefined, 'Cart delete');

    this.DISCOUNT_CONTAINER = createElementBase('div', ['d-flex', 'justify-content-end', 'me-2', 'mt-3']);
    this.DISCOUNT_TITLE = createElementBase('div', ['fw-bold'], undefined, 'Promo code:');
    this.DISCOUNT_INPUT = createElementBase('input', []);
    this.DISCOUNT_BUTTON = createElementBase('button', ['btn_max', 'btn', 'btn-success'], undefined, 'Apply');

    this.DELETE_BUTTON.setAttribute('type', 'button');
    this.DELETE_BUTTON.setAttribute('data-bs-toggle', 'modal');
    this.DELETE_BUTTON.setAttribute('data-bs-target', '#busketModal');
    this.DISCOUNT_INPUT.setAttribute('type', 'text');

    this.modal = new BusketModal();

    this.createListItem(cart);

    this.PAGE.append(
      this.DELETE_BUTTON_CONTAINER,
      this.LIST,
      this.TOTAL_CONTAINER,
      this.TOTAL_PRICE_THROUGH_CONTAINER,
      this.DISCOUNT_CONTAINER,
      this.modal.MODAL
    );
    this.addEvents();
  }

  private async createListItem(cart?: Cart) {
    const cachedCart: null | Cart = JSON.parse(localStorage.getItem('MyCart') || 'null');
    const cartId = cachedCart?.id;

    let busket = cart;

    if (cartId) {
      busket = busket || (await getCart(cartId)).body;
    }

    if (!cartId || !busket || busket.lineItems.length === 0) {
      const TITLE_CONTAINER = createElementBase('div', ['d-flex', 'justify-content-center']);
      const TITLE = createElementBase('div', []);
      const LINK = createElementBase('a', [], undefined, 'our catalog');
      LINK.setAttribute('href', '/catalog');
      TITLE.innerHTML = 'Your cart is empty. Please go to ';
      TITLE_CONTAINER.append(TITLE);
      TITLE.append(LINK);
      this.PAGE.append(TITLE_CONTAINER);
      return;
    }

    const names = busket.lineItems.map((item) => item.name.en);
    const promoPrices = busket.lineItems.map((item) => {
      if (item.discountedPricePerQuantity.length === 0) {
        return false;
      }
      return true;
    });
    const discountPrices = busket.lineItems.map((item) => {
      const price = item.price.discounted?.value.centAmount;
      if (price) {
        return new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(price / 100);
      }
      return null;
    });
    const mainPrices = busket.lineItems.map((item) => {
      const price = item.price.value.centAmount;
      return new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(price / 100);
    });
    const totalPrices = busket.lineItems.map((item) => {
      const price = item.totalPrice.centAmount;
      return new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(price / 100);
    });
    const counts = busket.lineItems.map((item) => item.quantity);
    const images = busket.lineItems.map((item) => {
      const img = item.variant.images;
      if (img) {
        return img[0].url;
      }
      return '';
    });
    const productId = busket.lineItems.map((item) => item.id);

    for (let i = 0; i < busket.lineItems.length; i += 1) {
      const LIST_ITEM = createElementBase(
        'li',
        ['row', 'list-item', 'justify-content-end', 'align-items-center'],
        productId[i]
      );
      const IMAGE = createElementBase('img', ['image', 'col-1']);
      const PRODUCT_CONTAINER = createElementBase('div', ['col-5', 'align-self-center']);
      const PRODUCT_NAME = createElementBase('div', ['fw-bold'], undefined, names[i]);

      const COUNT = createElementBase('div', ['count', 'col-3', 'justify-content-center', 'align-self-center']);
      const BUTTON_ITEM_REMOVE = createElementBase(
        'button',
        ['btn_min', 'btn', 'btn-outline-secondary'],
        undefined,
        '➖'
      );
      const COUNT_NUMBER = createElementBase('input', ['count-input']);
      const BUTTON_ITEM_ADD = createElementBase('button', ['btn_max', 'btn', 'btn-outline-secondary'], undefined, '➕');

      const PRODUCTS_TOTAL_CONTAINER = createElementBase('div', ['col-2', 'align-self-center', 'text-center']);
      const PRODUCTS_TOTAL = createElementBase(
        'div',
        ['text-primary', 'fw-bold', 'text-center'],
        undefined,
        `${totalPrices[i]}`
      );
      const PRICES_TOTAL_THROUGH = createElementBase('div', [
        'text-decoration-line-through',
        'small',
        'text-secondary',
        'text-center',
      ]);

      const BUTTON_REMOVE = createElementBase('button', ['btn-close', 'align-self-center']);
      const DISCOUNT_PRICE = createElementBase('span', ['me-2']);
      const MAIN_PRICE = createElementBase('s', ['small']);

      IMAGE.setAttribute('src', images[i]);
      IMAGE.setAttribute('width', '5%');
      BUTTON_ITEM_REMOVE.setAttribute('type', 'button');
      COUNT_NUMBER.setAttribute('type', 'text');
      COUNT_NUMBER.setAttribute('value', `${counts[i]}`);
      BUTTON_ITEM_ADD.setAttribute('type', 'button');
      BUTTON_REMOVE.setAttribute('aria-label', 'remoove');

      if (!discountPrices[i]) {
        DISCOUNT_PRICE.innerText = `${mainPrices[i]}`;
        if (promoPrices[i]) {
          PRICES_TOTAL_THROUGH.innerText = `${this.getThroughPrice(busket, counts[i], i)}`;
        }
      } else {
        DISCOUNT_PRICE.innerText = `${discountPrices[i]}`;
        MAIN_PRICE.innerText = `${mainPrices[i]}`;
        PRICES_TOTAL_THROUGH.innerText = `${this.getThroughPrice(busket, counts[i], i)}`;
      }

      if (promoPrices.some((item) => item === true) || discountPrices.some((item) => item !== null)) {
        this.TOTAL_PRICE_THROUGH.innerText = this.getThroughTotalPrice(busket);
      }

      PRODUCT_CONTAINER.append(PRODUCT_NAME, DISCOUNT_PRICE, MAIN_PRICE);
      COUNT.append(BUTTON_ITEM_REMOVE, COUNT_NUMBER, BUTTON_ITEM_ADD);
      PRODUCTS_TOTAL_CONTAINER.append(PRODUCTS_TOTAL, PRICES_TOTAL_THROUGH);
      LIST_ITEM.append(IMAGE, PRODUCT_CONTAINER, COUNT, PRODUCTS_TOTAL_CONTAINER, BUTTON_REMOVE);
      this.LIST.append(LIST_ITEM);
    }

    this.TOTAL_PRICE.innerText = new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
      busket.totalPrice.centAmount / 100
    );

    this.DISCOUNT_CONTAINER.append(this.DISCOUNT_TITLE, this.DISCOUNT_INPUT, this.DISCOUNT_BUTTON);
    this.TOTAL_PRICE_THROUGH_CONTAINER.append(this.TOTAL_PRICE_THROUGH);
    this.TOTAL_CONTAINER.append(this.TOTAL_TITLE, this.TOTAL_PRICE);
    this.DELETE_BUTTON_CONTAINER.append(this.DELETE_BUTTON);
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
      this.disableButtons();
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

        this.disableButtons();
        this.changeQuantity(COUNT_INPUT).catch((error: Error) => {
          showModal(false, error.message);
          this.enableButtons();
          COUNT_INPUT.value = `${+COUNT_INPUT.value + 1}`;
        });
      }

      if (target.classList[0] === 'btn_max') {
        COUNT_INPUT.value = `${+COUNT_INPUT.value + 1}`;

        this.disableButtons();
        this.changeQuantity(COUNT_INPUT).catch((error: Error) => {
          showModal(false, error.message);
          this.enableButtons();
          COUNT_INPUT.value = `${+COUNT_INPUT.value - 1}`;
        });
      }
    });

    this.LIST.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLButtonElement;
      if (target.classList[0] !== 'btn-close') return;

      const ITEM = target.closest('li');
      if (!ITEM) return;

      const cachedCart: null | Cart = JSON.parse(localStorage.getItem('MyCart') || 'null');
      const { id: cartId, version: cartVersion } = cachedCart || { id: null, version: null };

      if (!cartId || !cartVersion) return;

      this.disableButtons();
      this.removeItem(target).catch((error: Error) => {
        showModal(false, error.message);
        this.enableButtons();
      });
    });

    this.modal.BUTTON_YES.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();
      const target = event.target as HTMLButtonElement;
      if (target.tagName !== 'BUTTON') return;

      const cachedCart: null | Cart = JSON.parse(localStorage.getItem('MyCart') || 'null');
      const { id: cartId, version: cartVersion } = cachedCart || { id: null, version: null };

      if (!cartId || !cartVersion) return;

      this.disableButtons();
      this.removeCart().catch((error: Error) => {
        showModal(false, error.message);
        this.enableButtons();
      });
    });

    this.DISCOUNT_BUTTON.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLButtonElement;
      if (target.tagName !== 'BUTTON') return;

      const cachedCart: null | Cart = JSON.parse(localStorage.getItem('MyCart') || 'null');
      const { id: cartId, version: cartVersion } = cachedCart || { id: null, version: null };

      if (!cartId || !cartVersion) return;

      const code = (target.previousElementSibling as HTMLInputElement).value;
      if (!code) return;

      this.disableButtons();
      this.addPromoCode(code).catch((error: Error) => {
        showModal(false, error.message);
        this.enableButtons();
      });
    });
  }

  private async changeQuantity(element: HTMLInputElement) {
    const cachedCart: null | Cart = JSON.parse(localStorage.getItem('MyCart') || 'null');
    const { id: cartId, version: cartVersion } = cachedCart || { id: null, version: null };

    const LIST = element.closest('li');
    if (!cartId || !LIST || !cartVersion) return;

    const productId = LIST.id;
    const { body } = await changeLineItemQuantity(cartId, productId, +cartVersion, +element.value);
    this.setCartInLocalStorage(body);
    this.replacePage(body);
    checkCartLineItemsQty(/* body */);

    [...CONTENT.children].forEach((card: Element) => {
      card.dispatchEvent(new CustomEvent<Cart | null>('successUpdateCart', { detail: body }));
    });
  }

  private async removeItem(element: HTMLButtonElement) {
    const cachedCart: null | Cart = JSON.parse(localStorage.getItem('MyCart') || 'null');
    const { id: cartId, version: cartVersion } = cachedCart || { id: null, version: null };

    const LIST = element.closest('li');
    if (!cartId || !LIST || !cartVersion) return;

    const productId = LIST.id;
    const cart = await removeLineItem(cartId, +cartVersion, productId);
    this.setCartInLocalStorage(cart);
    this.replacePage(cart);
    checkCartLineItemsQty();

    [...CONTENT.children].forEach((card: Element) => {
      card.dispatchEvent(new CustomEvent<Cart | null>('successUpdateCart', { detail: cart }));
    });
  }

  private async removeCart() {
    const cachedCart: null | Cart = JSON.parse(localStorage.getItem('MyCart') || 'null');
    const { id: cartId, version: cartVersion } = cachedCart || { id: null, version: null };

    if (!cartId || !cartVersion) return;

    await deleteCart(cartId, +cartVersion);
    this.removeCartInLocalStorage();
    this.replacePage();
    checkCartLineItemsQty();
    this.modal.modal?.hide();
    [...CONTENT.children].forEach((card: Element) => {
      card.dispatchEvent(new CustomEvent<Cart | null>('successUpdateCart'));
    });
  }

  private async addPromoCode(code: string) {
    const cachedCart: null | Cart = JSON.parse(localStorage.getItem('MyCart') || 'null');
    const { id: cartId, version: cartVersion } = cachedCart || { id: null, version: null };

    if (!cartId || !cartVersion) return;

    const { body } = await addDiscountCode(cartId, +cartVersion, code);

    this.setCartInLocalStorage(body);
    this.replacePage();
  }

  private setCartInLocalStorage(body: Cart) {
    localStorage.setItem('MyCart', JSON.stringify(body));
  }

  private removeCartInLocalStorage() {
    localStorage.removeItem('MyCart');
  }

  private replacePage(cart?: Cart) {
    const PAGE = findDomElement(document.body, '#basketPage');

    PAGE.replaceWith(new BasketPage(cart).PAGE);
  }

  private disableButtons() {
    const buttons = findDomElements<'button'>(this.LIST, 'button');
    buttons.forEach((item) => item.classList.add('disabled'));
  }

  private enableButtons() {
    const buttons = findDomElements<'button'>(this.LIST, 'button');
    buttons.forEach((item) => item.classList.remove('disabled'));
  }

  private getThroughPrice(body: Cart, count: number, index: number) {
    const price = body.lineItems[index].price.value.centAmount * count;
    return new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(price / 100);
  }

  private getThroughTotalPrice(body: Cart) {
    const price = body.lineItems.reduce((a, b) => a + b.price.value.centAmount * b.quantity, 0);

    return new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(price / 100);
  }
}
