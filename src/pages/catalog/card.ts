import { ProductProjection } from '@commercetools/platform-sdk';
import { createElement } from '../../shared/helpers/dom-utilites';

export default function createCard(product: ProductProjection) {
  const imgSrc = product.masterVariant.images
    ? product.masterVariant.images.filter((image) => image.url.includes('card'))[0].url ||
      product.masterVariant.images[0].url ||
      ''
    : '';
  const productTitle = product.name.en;
  const productDescription = product.description?.en || '';
  const productPrices = product.masterVariant.prices;
  const productMainPrice = productPrices?.[0].value.centAmount
    ? `${productPrices[0].value.centAmount / 100}`
    : undefined;
  const productDiscountPrice = productPrices?.[0].discounted?.value.centAmount
    ? `${productPrices[0].discounted.value.centAmount / 100}`
    : undefined;

  return createElement({
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
      (() => {
        const MAIN_PRICE = createElement({
          tagname: 'button',
          options: [
            ['className', 'btn btn-primary fs-2'],
            ['textContent', productDiscountPrice || productMainPrice || 'N/A'],
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
  });
}
