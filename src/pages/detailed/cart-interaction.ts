import { createElement } from '../../shared/helpers/dom-utilites';
import './cart-interaction.scss';
import { addLineItem, createCart } from './detailed-data';

const ADD_TO_CART_BTN = createElement({
  tagname: 'button',
  options: [
    ['classList', 'btn btn-lg btn-dark detailed__add-btn'],
    ['textContent', 'Add to Cart'],
  ],
});

let productId: string;

export function passProductId(id: string) {
  productId = id;
}

ADD_TO_CART_BTN.addEventListener('click', async () => {
  let cartId: string;
  if (localStorage.getItem('cartId')) {
    cartId = localStorage.getItem('cartId') as string;
  } else {
    cartId = (await createCart()).body.id;
    const cartVersion = (await createCart()).body.version;
    localStorage.setItem('cartId', cartId);
    localStorage.setItem('cartVersion', cartVersion.toString());
  }

  const lineItemResponce = (await addLineItem(cartId, productId)).body;
  console.log(lineItemResponce);
});

const removeFromCartBtn = createElement({
  tagname: 'button',
  options: [
    ['classList', 'btn btn-lg btn-dark'],
    ['textContent', 'Remove from Cart'],
  ],
});

// eslint-disable-next-line import/prefer-default-export
export const detailedBtnBox = createElement({
  tagname: 'div',
  options: [['className', 'detailed__btn-box']],
  childElements: [ADD_TO_CART_BTN, removeFromCartBtn],
});
