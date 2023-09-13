import { Cart, ProductProjection } from '@commercetools/platform-sdk';
import router from '../../app/router/router';
import { createElement } from '../../shared/helpers/dom-utilites';
import { updateCart } from '../../shared/api/cart-handler';

function basketClickHandleWithCardParams(product: ProductProjection) {
  return async function basketClickHandle(this: HTMLDivElement, event: Event) {
    event.stopPropagation();

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

    this.before(blur);

    const cart: Cart | null = JSON.parse(localStorage.getItem('MyCart') || 'null');

    if (this.classList.contains('add-to-basket')) {
      const updatedCart = await updateCart([
        {
          action: 'addLineItem',
          productId: product.id,
          variantId: 1,
          quantity: 1,
        },
      ]);

      localStorage.setItem('MyCart', JSON.stringify(updatedCart));
    } else {
      const updatedCart = await updateCart([
        {
          action: 'removeLineItem',
          lineItemId: cart?.lineItems.filter((item) => item.productId === product.id)[0].id,
          quantity: 1,
        },
      ]);

      localStorage.setItem('MyCart', JSON.stringify(updatedCart));
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

  const BASKET = createElement({
    tagname: 'div',
    options: [['className', `my-card-basket ${added ? 'remove-from-basket' : 'add-to-basket'}`]],
    events: [['click', basketClickHandleWithCardParams(product)]],
  });

  const card = createElement({
    tagname: 'div',
    options: [['className', 'my-card']],
    childElements: [
      BASKET,
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
      (() => {
        const MAIN_PRICE = createElement({
          tagname: 'button',
          options: [
            ['className', 'btn btn-primary fs-2'],
            ['textContent', productDiscountPrice || productMainPrice || 'N/A'],
          ],
          events: [
            [
              'click',
              (event) => {
                event.stopPropagation();
                if (cardKey) {
                  router.navigate(`/catalog/${cardKey}`);
                }
              },
            ],
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
        return MAIN_PRICE;
      })(),
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

  card.addEventListener('successUpdateCart', (e: CustomEvent<Cart | null>) => {
    if (e.detail?.lineItems.some((item) => item.productId === product.id)) {
      BASKET.classList.replace('add-to-basket', 'remove-from-basket');
    } else {
      BASKET.classList.replace('remove-from-basket', 'add-to-basket');
    }
  });
  return card;
}
