import { Cart } from '@commercetools/platform-sdk';
import { addLineItem, checkCart, updateCart } from '../../shared/api/for-carts-and-lineItems';
import { createElement, findDomElements } from '../../shared/helpers/dom-utilites';
import showModal from '../../shared/modal/modal-window';
import './cart-interaction.scss';
import CONTENT from '../catalog/content';

export async function checkCartLineItemsQty() {
  const lineItemsBadges = findDomElements(document.body, '.nav-link__line-items-qty');
  const cart: Cart | null = JSON.parse(localStorage.getItem('MyCart') || 'null');
  if (cart && cart.totalLineItemQuantity && cart.totalLineItemQuantity > 0) {
    lineItemsBadges.forEach((link) => {
      const lineItemsBadge = link;

      lineItemsBadge.classList.add('nav-link__line-items-qty--active');
      lineItemsBadge.innerHTML = `&nbsp;${cart.totalLineItemQuantity}&nbsp;`;
    });
  } else {
    lineItemsBadges.forEach((link) => {
      link.classList.remove('nav-link__line-items-qty--active');
    });
  }
}

const ADD_TO_CART_BTN = createElement({
  tagname: 'button',
  options: [
    ['classList', 'btn btn-lg btn-dark detailed__add-btn'],
    ['textContent', 'Add to Cart'],
  ],
});

const REMOVE_FROM_CART_BTN = createElement({
  tagname: 'button',
  options: [
    ['classList', 'btn btn-lg btn-dark detailed__remove-btn'],
    ['textContent', 'Remove from Cart'],
  ],
});

function toggleDisableAddtBtn() {
  ADD_TO_CART_BTN.classList.toggle('disabled');
}

function toggleRemoveBtn() {
  REMOVE_FROM_CART_BTN.classList.toggle('detailed__remove-btn--active');
}

async function addProductToCart() {
  toggleDisableAddtBtn();

  const currentProductId = localStorage.getItem('currentProductId') || '';
  const { id: cartId, version: cartVersion } = await checkCart();

  try {
    const newCart = await addLineItem(cartId, currentProductId, cartVersion);
    localStorage.setItem('MyCart', JSON.stringify(newCart));
    checkCartLineItemsQty();
    showModal(true, '', '', 'The product was successfully added to your cart');
    [...CONTENT.children].forEach((card: Element) => {
      card.dispatchEvent(new CustomEvent<Cart | null>('successUpdateCart', { detail: newCart }));
    });
    toggleRemoveBtn();
  } catch {
    toggleDisableAddtBtn();
    showModal(false, '', '', `The product wasn't added to your cart`);
  }
}

async function removeProductFromCart() {
  toggleRemoveBtn();

  const cart = await checkCart();
  const currentProductId = localStorage.getItem('currentProductId');

  const requiredLineItemId = cart.lineItems.filter(({ productId }) => productId === currentProductId)[0]?.productId;
  try {
    const newCart = await updateCart(cart.id, {
      version: cart.version,
      actions: [
        {
          action: 'removeLineItem',
          lineItemId: cart?.lineItems.filter((item) => item.productId === requiredLineItemId)[0].id,
        },
      ],
    });
    localStorage.setItem('MyCart', JSON.stringify(newCart));
    checkCartLineItemsQty();
    showModal(true, '', '', 'The product was successfully removed from the cart');
    [...CONTENT.children].forEach((card: Element) => {
      card.dispatchEvent(new CustomEvent<Cart | null>('successUpdateCart', { detail: newCart }));
    });
    toggleDisableAddtBtn();
  } catch (err) {
    toggleRemoveBtn();
    showModal(false, '', `${err}. Remove product from cart`, `The product wasn't removed from the cart`);
  }
}

ADD_TO_CART_BTN.addEventListener('click', addProductToCart);
REMOVE_FROM_CART_BTN.addEventListener('click', removeProductFromCart);

export const detailedBtnBox = createElement({
  tagname: 'div',
  options: [['className', 'detailed__btn-box']],
  childElements: [ADD_TO_CART_BTN, REMOVE_FROM_CART_BTN],
});

export async function checkProductInCart(currentProductId: string) {
  const cart: Cart | null = JSON.parse(localStorage.getItem('MyCart') || 'null');
  if (cart && cart.lineItems.some(({ productId }) => productId === currentProductId)) {
    ADD_TO_CART_BTN.classList.add('disabled');
    REMOVE_FROM_CART_BTN.classList.add('detailed__remove-btn--active');
  } else {
    ADD_TO_CART_BTN.classList.remove('disabled');
    REMOVE_FROM_CART_BTN.classList.remove('detailed__remove-btn--active');
  }
}
