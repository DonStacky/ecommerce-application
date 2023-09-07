import { createElement } from '../../shared/helpers/dom-utilites';
import showModal from '../../shared/modal/modal-window';
import './cart-interaction.scss';
import { addLineItem, createCart, getCart } from './detailed-data';

export async function checkCartAvailability() {
  if (!localStorage.getItem('cartId')) {
    const cartId = (await createCart()).body.id;
    const cartVersion = (await createCart()).body.version;
    localStorage.setItem('cartId', cartId);
    localStorage.setItem('cartVersion', cartVersion.toString());
  }
  console.log('Cart created with id =', localStorage.getItem('cartId'));
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

function disableAddToCartBtn() {
  ADD_TO_CART_BTN.classList.add('disabled');
  REMOVE_FROM_CART_BTN.classList.add('detailed__remove-btn--active');
}

async function addProductToCart() {
  disableAddToCartBtn();

  const currentProductId = localStorage.getItem('currentProductId');
  const cartId = localStorage.getItem('cartId');
  const cartVersion = localStorage.getItem('cartVersion');
  console.log(cartVersion);

  if (currentProductId && cartId && cartVersion) {
    const result = await addLineItem(cartId, currentProductId, Number(cartVersion));
    console.log(result);
  }

  showModal(true, 'add product to cart');
}

ADD_TO_CART_BTN.addEventListener('click', addProductToCart);

// eslint-disable-next-line import/prefer-default-export
export const detailedBtnBox = createElement({
  tagname: 'div',
  options: [['className', 'detailed__btn-box']],
  childElements: [ADD_TO_CART_BTN, REMOVE_FROM_CART_BTN],
});

export async function checkProductInCart(currentProductId: string) {
  const cartId = localStorage.getItem('cartId');

  if (cartId) {
    const { lineItems } = (await getCart(cartId)).body;
    const { body } = await getCart(cartId);

    console.log('body', body);

    if (lineItems.some(({ productId }) => productId === currentProductId)) {
      disableAddToCartBtn();
      console.log('yes');
    } else {
      console.log('no');
      console.log(lineItems);
      console.log(currentProductId);
      ADD_TO_CART_BTN.classList.remove('disabled');
      REMOVE_FROM_CART_BTN.classList.remove('detailed__remove-btn--active');
    }
  }
}
