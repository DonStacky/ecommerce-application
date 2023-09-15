import { Cart, ProductProjection } from '@commercetools/platform-sdk';
import router from '../../app/router/router';
import { createElement } from '../../shared/helpers/dom-utilites';
import { checkCart, updateCart } from '../../shared/api/for-carts-and-lineItems';
import { checkCartLineItemsQty } from '../detailed/cart-interaction';

function basketClickHandleWithCardParams(product: ProductProjection, card: HTMLDivElement) {
  return async function basketClickHandle(this: HTMLDivElement, event: Event) {
    event.stopPropagation();

    if (!localStorage.getItem('cartUpdatePermission')) {
      return;
    }

    const blur = createElement({
      tagname: 'div',
      options: [
        ['className', 'blur'],
        [
          'innerHTML',
          `<div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>`,
        ],
      ],
    });

    card.prepend(blur);

    const cart = await checkCart();

    if (this.classList.contains('add-to-basket')) {
      const updatedCart = await updateCart(cart.id, {
        actions: [
          {
            action: 'addLineItem',
            productId: product.id,
            variantId: 1,
            quantity: 1,
          },
        ],
        version: cart.version,
      });

      this.classList.replace('add-to-basket', 'remove-from-basket');
      this.title = 'Remove item';
      localStorage.setItem('MyCart', JSON.stringify(updatedCart));
      checkCartLineItemsQty();
    } else {
      const updatedCart = await updateCart(cart.id, {
        actions: [
          {
            action: 'removeLineItem',
            lineItemId: cart?.lineItems.filter((item) => item.productId === product.id)[0].id,
          },
        ],
        version: cart.version,
      });

      this.classList.replace('remove-from-basket', 'add-to-basket');
      this.title = 'Add item';
      localStorage.setItem('MyCart', JSON.stringify(updatedCart));
      checkCartLineItemsQty();
    }

    blur.remove();
  };
}

export default function createCard(product: ProductProjection, added: boolean) {
  const cardKey = product.key;
  const imgSrc = product.masterVariant.images
    ? product.masterVariant.images.filter((image) => image.url.includes('card'))[0].url ||
      product.masterVariant.images[0].url ||
      ''
    : '';
  const productTitle = product.name.en;
  const productDescription = product.description?.en || '';
  const productPrices = product.masterVariant.prices;
  const productMainPrice = productPrices?.[0].value.centAmount
    ? `${productPrices[0].value.centAmount / 100} $`
    : undefined;
  const productDiscountPrice = productPrices?.[0].discounted?.value.centAmount
    ? `${productPrices[0].discounted.value.centAmount / 100} $`
    : undefined;

  const MAIN_PRICE = createElement({
    tagname: 'button',
    options: [
      ['className', `btn btn-primary fs-2 my-card-basket ${added ? 'remove-from-basket' : 'add-to-basket'}`],
      ['textContent', `Price: ${productDiscountPrice || productMainPrice || 'N/A'}`],
      ['title', `${added ? 'Remove item' : 'Add item'}`],
    ],
  });
  if (productDiscountPrice) {
    MAIN_PRICE.append(
      createElement({
        tagname: 'span',
        options: [
          ['className', 'discount'],
          ['textContent', productMainPrice || 'N/A'],
        ],
      })
    );
  }

  const card = createElement({
    tagname: 'div',
    options: [['className', 'my-card']],
    childElements: [
      createElement({
        tagname: 'img',
        options: [
          ['className', 'my-card-image'],
          ['src', imgSrc],
        ],
      }),
      createElement({
        tagname: 'div',
        options: [['className', 'my-card-body']],
        childElements: [
          createElement({
            tagname: 'h2',
            options: [
              ['className', 'my-card-title fs-2'],
              ['textContent', productTitle],
            ],
          }),
          createElement({
            tagname: 'p',
            options: [
              ['className', 'my-card-text fs-3'],
              ['textContent', productDescription],
            ],
          }),
        ],
      }),
      MAIN_PRICE,
    ],
    events: [
      [
        'click',
        () => {
          if (cardKey) {
            router.navigate(`/catalog/${cardKey}`);
          }
        },
      ],
    ],
  });

  card.addEventListener('successUpdateCart', (e: CustomEvent<Cart>) => {
    if (e.detail?.lineItems.some((item) => item.productId === product.id)) {
      MAIN_PRICE.classList.replace('add-to-basket', 'remove-from-basket');
      MAIN_PRICE.title = 'Remove item';
    } else {
      MAIN_PRICE.classList.replace('remove-from-basket', 'add-to-basket');
      MAIN_PRICE.title = 'Add item';
    }
  });

  MAIN_PRICE.addEventListener('click', basketClickHandleWithCardParams(product, card));
  return card;
}
