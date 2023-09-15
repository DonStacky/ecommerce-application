import { Cart } from '@commercetools/platform-sdk';
import { changeLineItemQuantity, deleteCart, getCart, removeLineItem } from '../../shared/api/for-carts-and-lineItems';
import { createElementBase, findDomElement, findDomElements } from '../../shared/helpers/dom-utilites';
import showModal from '../../shared/modal/modal-window';
import { checkCartLineItemsQty } from '../detailed/cart-interaction';
import BusketModal from './busket-modal';
import CONTENT from '../catalog/content';

export default class BasketPage {
  LIST: HTMLOListElement;

  PAGE: HTMLDivElement;

  TOTAL: HTMLDivElement;

  TOTAL_TITLE: HTMLDivElement;

  TOTAL_PRICE: HTMLDivElement;

  total: string;

  DELETE_BUTTON: HTMLButtonElement;

  DELETE_BUTTON_CONTAINER: HTMLDivElement;

  modal: BusketModal;

  constructor(cart?: Cart) {
    this.total = '0';

    this.PAGE = createElementBase('div', ['container', 'container_margin'], 'basketPage');
    this.LIST = createElementBase('ol', ['list-group', 'list-group-numbered']);
    this.TOTAL = createElementBase('div', ['d-flex', 'justify-content-end', 'me-2']);
    this.TOTAL_TITLE = createElementBase('div', ['fw-bold'], undefined, 'Total:');
    this.TOTAL_PRICE = createElementBase('div', ['text-primary', 'fw-bold', 'ms-3']);
    this.DELETE_BUTTON_CONTAINER = createElementBase('div', ['d-flex', 'justify-content-end', 'me-2']);
    this.DELETE_BUTTON = createElementBase('button', ['btn_max', 'btn', 'btn-danger'], undefined, 'Cart delete');

    this.DELETE_BUTTON.setAttribute('type', 'button');
    this.DELETE_BUTTON.setAttribute('data-bs-toggle', 'modal');
    this.DELETE_BUTTON.setAttribute('data-bs-target', '#busketModal');

    this.modal = new BusketModal();

    this.createListItem(cart);

    this.PAGE.append(this.LIST, this.TOTAL, this.DELETE_BUTTON_CONTAINER, this.modal.MODAL);
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
    const prices = busket.lineItems.map((item) => {
      const price = item.price.discounted?.value.centAmount || item.price.value.centAmount;
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
      const PRODUCT_CONTAINER = createElementBase('div', ['col-6', 'align-self-center']);
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

      const PRODUCTS_TOTAL = createElementBase(
        'div',
        ['text-primary', 'fw-bold', 'col-1', 'align-self-center', 'text-center'],
        undefined,
        `${totalPrices[i]}`
      );
      const BUTTON_REMOVE = createElementBase('button', ['btn-close', 'align-self-center']);

      IMAGE.setAttribute('src', images[i]);
      IMAGE.setAttribute('width', '5%');
      BUTTON_ITEM_REMOVE.setAttribute('type', 'button');
      COUNT_NUMBER.setAttribute('type', 'text');
      COUNT_NUMBER.setAttribute('value', `${counts[i]}`);
      BUTTON_ITEM_ADD.setAttribute('type', 'button');
      BUTTON_REMOVE.setAttribute('aria-label', 'remoove');

      PRODUCT_CONTAINER.append(PRODUCT_NAME, `${prices[i]}`);
      COUNT.append(BUTTON_ITEM_REMOVE, COUNT_NUMBER, BUTTON_ITEM_ADD);
      LIST_ITEM.append(IMAGE, PRODUCT_CONTAINER, COUNT, PRODUCTS_TOTAL, BUTTON_REMOVE);
      this.LIST.append(LIST_ITEM);
    }

    this.TOTAL_PRICE.innerText = new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
      busket.totalPrice.centAmount / 100
    );

    this.TOTAL.append(this.TOTAL_TITLE, this.TOTAL_PRICE);
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
    const /* { body } */ cart = await removeLineItem(cartId, +cartVersion, productId);
    this.setCartInLocalStorage(/* body */ cart);
    this.replacePage(/* body */ cart);
    checkCartLineItemsQty(/* body */);

    [...CONTENT.children].forEach((card: Element) => {
      card.dispatchEvent(new CustomEvent<Cart | null>('successUpdateCart', { detail: cart }));
    });
  }

  private async removeCart() {
    if (!localStorage.getItem('cartUpdatePermission')) {
      return;
    }

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
}
