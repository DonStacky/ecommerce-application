import { Cart } from '@commercetools/platform-sdk';
import { addLineItem, createCart, getCart, removeLineItem } from '../../shared/api/for-carts-and-lineItems';
import { createElement, findDomElements } from '../../shared/helpers/dom-utilites';
import showModal from '../../shared/modal/modal-window';
import './cart-interaction.scss';

export async function checkCartAvailability() {
  if (!localStorage.getItem('cartId')) {
    const cartId = (await createCart()).body.id;
    const cartVersion = (await createCart()).body.version;
    localStorage.setItem('cartId', cartId);
    localStorage.setItem('cartVersion', cartVersion.toString());
  }
}

export async function checkCartLineItemsQty(cart?: Cart) {
  const cartId = localStorage.getItem('cartId');
  const lineItemsBadges = findDomElements(document.body, '.nav-link__line-items-qty');

  if (cartId) {
    const bodyCart = cart || (await getCart(cartId)).body;

    if (bodyCart.totalLineItemQuantity && bodyCart.totalLineItemQuantity > 0) {
      const lineItemsQty = bodyCart.totalLineItemQuantity;

      lineItemsBadges.forEach((link) => {
        const lineItemsBadge = link;

        lineItemsBadge.classList.add('nav-link__line-items-qty--active');
        lineItemsBadge.innerHTML = `&nbsp;${lineItemsQty}&nbsp;`;
      });
    }
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

function toggleCartBtn() {
  ADD_TO_CART_BTN.classList.toggle('disabled');
  REMOVE_FROM_CART_BTN.classList.toggle('detailed__remove-btn--active');
}

async function addProductToCart() {
  const currentProductId = localStorage.getItem('currentProductId');
  const cartId = localStorage.getItem('cartId');
  const cartVersion = localStorage.getItem('cartVersion');

  if (currentProductId && cartId && cartVersion) {
    const response = await addLineItem(cartId, currentProductId, Number(cartVersion));
    const lineItemId = response.body.lineItems?.at(-1)?.id;
    const centAmount = response.body.lineItems?.at(-1)?.totalPrice?.centAmount;
    const newCartVersion = response.body.version;

    localStorage.setItem('cartVersion', newCartVersion.toString());

    if (lineItemId && centAmount) {
      if (localStorage.getItem('lineItemInfo')) {
        const lineItemInfo = new Map(Object.entries(JSON.parse(localStorage.getItem('lineItemInfo') as string)));
        lineItemInfo.set(currentProductId, `${lineItemId}+${centAmount}`);
        localStorage.setItem('lineItemInfo', JSON.stringify(Object.fromEntries(lineItemInfo.entries())));
      } else {
        const lineItemInfo = new Map();
        lineItemInfo.set(currentProductId, `${lineItemId}+${centAmount}`);
        localStorage.setItem('lineItemInfo', JSON.stringify(Object.fromEntries(lineItemInfo.entries())));
      }
    }

    if (response.statusCode === 200) {
      toggleCartBtn();
      checkCartLineItemsQty();
      showModal(true, 'add product to cart');
    } else {
      showModal(false, 'Add product to cart');
    }
  }
}

async function removeProductFromCart() {
  const cartId = localStorage.getItem('cartId');
  const cartVersion = localStorage.getItem('cartVersion');
  const productId = localStorage.getItem('currentProductId');

  if (productId) {
    const lineItemInfo = new Map(
      Object.entries(JSON.parse(localStorage.getItem('lineItemInfo') as string) as [string, string])
    );

    const lineItemId = lineItemInfo?.get(productId)?.split('+')[0];
    // const centAmount = lineItemInfo?.get(productId)?.split('+')[1];

    try {
      if (cartId && cartVersion && lineItemId /*  && centAmount */) {
        const response = await removeLineItem(cartId, Number(cartVersion), lineItemId /* , Number(centAmount) */);
        const newCartVersion = response.body.version;

        localStorage.setItem('cartVersion', newCartVersion.toString());

        if (response.statusCode === 200) {
          checkCartLineItemsQty();
          toggleCartBtn();
          showModal(true, 'remove product from cart');
        } else {
          showModal(false, 'Remove product from cart');
        }
      }
    } catch (err) {
      showModal(false, `${err}. Remove product from cart`);
    }
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
  const cartId = localStorage.getItem('cartId');

  if (cartId) {
    const { body } = await getCart(cartId);
    const { lineItems } = body;
    const cartVersion = body.version;
    localStorage.setItem('cartVersion', cartVersion.toString());

    if (lineItems.some(({ productId }) => productId === currentProductId)) {
      ADD_TO_CART_BTN.classList.add('disabled');
      REMOVE_FROM_CART_BTN.classList.add('detailed__remove-btn--active');
    } else {
      ADD_TO_CART_BTN.classList.remove('disabled');
      REMOVE_FROM_CART_BTN.classList.remove('detailed__remove-btn--active');
    }
  }
}
