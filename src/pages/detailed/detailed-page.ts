import { createElement } from '../../shared/helpers/dom-utilites';
import { getCategories, getProduct } from './detailed-data';
import { MODAL, MODAL_BODY } from './detailed-modal';
import './detailed-page.scss';
import { Image, CategoryReference } from '@commercetools/platform-sdk';

const DETAILED_TEXT_COLUMN = createElement({
  tagname: 'div',
  options: [
    [
      'className',
      'col text-center col-sm-6 col-8 d-flex flex-column justify-content-center align-items-start detailed__text-column',
    ],
  ],
});

const DETAILED_TITLE = createElement({
  tagname: 'h1',
  options: [['className', 'text-dark']],
});

const DETAILED_DESC_TEXT = createElement({
  tagname: 'p',
  options: [['className', 'text-dark mt-3 text-start detailed__text']],
});

const DETAILED_CAROUSEL_INNER = createElement({
  tagname: 'div',
  options: [['className', 'carousel-inner w-75']],
});
DETAILED_CAROUSEL_INNER.dataset.bsToggle = 'modal';
DETAILED_CAROUSEL_INNER.dataset.bsTarget = '#detailed-modal';

const SPAN_PREV_ICON = createElement({
  tagname: 'span',
  options: [
    ['className', 'carousel-control-prev-icon'],
    ['ariaHidden', 'true'],
  ],
});

const SPAN_PREV = createElement({
  tagname: 'span',
  options: [
    ['className', 'visually-hidden'],
    ['textContent', 'Previous'],
  ],
});

const BUTTON_PREV = createElement({
  tagname: 'button',
  options: [
    ['className', 'carousel-control-prev'],
    ['type', 'button'],
  ],
  childElements: [SPAN_PREV_ICON, SPAN_PREV],
});
BUTTON_PREV.dataset.bsTarget = '#carouselDetailed';
BUTTON_PREV.dataset.bsSlide = 'prev';

const SPAN_NEXT_ICON = createElement({
  tagname: 'span',
  options: [
    ['className', 'carousel-control-next-icon'],
    ['ariaHidden', 'true'],
  ],
});

const SPAN_NEXT = createElement({
  tagname: 'span',
  options: [
    ['className', 'visually-hidden'],
    ['textContent', 'Next'],
  ],
});

const BUTTON_NEXT = createElement({
  tagname: 'button',
  options: [
    ['className', 'carousel-control-next'],
    ['type', 'button'],
  ],
  childElements: [SPAN_NEXT_ICON, SPAN_NEXT],
});
BUTTON_NEXT.dataset.bsTarget = '#carouselDetailed';
BUTTON_NEXT.dataset.bsSlide = 'next';

export const DETAILED_CAROUSEL = createElement({
  tagname: 'div',
  options: [
    ['className', 'detailed__carousel carousel carousel-dark slide d-flex justify-content-center'],
    ['id', 'carouselDetailed'],
  ],
  childElements: [DETAILED_CAROUSEL_INNER, BUTTON_PREV, BUTTON_NEXT],
});

DETAILED_CAROUSEL_INNER.addEventListener(
  'click',
  () => {
    DETAILED_CAROUSEL.classList.add('detailed__carousel--modal');
    MODAL_BODY.append(DETAILED_CAROUSEL);
    DETAILED_CAROUSEL_INNER.dataset.bsToggle = '';
  },
  { once: true }
);

const DETAILED_CAROUSEL_COLUMN = createElement({
  tagname: 'div',
  options: [['className', 'col col-sm-6 col-12 d-flex justify-content-center']],
  childElements: [DETAILED_CAROUSEL],
});

const DETAILED_GRID_ROW = createElement({
  tagname: 'div',
  options: [['className', 'row detailed__products-row']],
  childElements: [DETAILED_CAROUSEL_COLUMN, DETAILED_TEXT_COLUMN],
});

export const DETAILED_PAGE = createElement({
  tagname: 'div',
  options: [['className', 'detailed container-xl']],
  childElements: [DETAILED_GRID_ROW, MODAL],
});

const details = ['Material', 'Season', 'Category', 'Size'];

const DETAILS_DTS = details.map((text) => {
  const DETAILS_DT = createElement({
    tagname: 'dt',
    options: [
      ['className', 'detailed__term'],
      ['textContent', `${text}`],
    ],
  });

  return DETAILS_DT;
});

const DETAILS_DDS = details.map(() => {
  const DETAILS_DD = createElement({
    tagname: 'dd',
    options: [['className', 'detailed__description']],
  });

  return DETAILS_DD;
});

async function getCharachteristics(categoriesRef: CategoryReference[], size: string) {
  const categoriesID = categoriesRef;

  const categories = categoriesID.map(async (item) => {
    return (await getCategories(item.id)).body.name;
  });

  DETAILS_DDS.forEach(async (dd, index) => {
    const definitionDescription = dd;

    if (index < 3) {
      definitionDescription.textContent = (await categories[index]).en;
    } else {
      definitionDescription.textContent = size;
    }
  });
}

const DETAILS_DLS = details.map((stub, index) => {
  const DETAILS_DL = createElement({
    tagname: 'dl',
    options: [['className', 'detailed__list']],
    childElements: [DETAILS_DTS[index], DETAILS_DDS[index]],
  });

  return DETAILS_DL;
});

const DETAILED_WRAPPER = createElement({
  tagname: 'div',
  options: [
    ['className', 'characteristic-wrapper'],
    ['id', 'detailedCharacteristic'],
  ],
  childElements: [...DETAILS_DLS],
});

const DETAILED_LINK = createElement({
  tagname: 'span',
  options: [
    ['className', 'characteristic-link mb-3'],
    ['textContent', 'Characteristics'],
    ['ariaExpanded', 'false'],
  ],
});

DETAILED_LINK.addEventListener('click', () => {
  DETAILED_WRAPPER.classList.toggle('characteristic-wrapper--show');
});

MODAL.addEventListener('hide.bs.modal', () => {
  DETAILED_CAROUSEL_COLUMN.append(DETAILED_CAROUSEL);
  DETAILED_CAROUSEL.classList.remove('detailed__carousel--modal');
  DETAILED_CAROUSEL_INNER.dataset.bsToggle = 'modal';

  DETAILED_CAROUSEL_INNER.addEventListener(
    'click',
    () => {
      DETAILED_CAROUSEL.classList.add('detailed__carousel--modal');
      MODAL_BODY.append(DETAILED_CAROUSEL);
      DETAILED_CAROUSEL_INNER.dataset.bsToggle = '';
    },
    { once: true }
  );
});

DETAILED_TEXT_COLUMN.append(DETAILED_LINK, DETAILED_WRAPPER);

const DETAILED_PRICE = createElement({
  tagname: 'span',
  options: [['className', 'detailed__price']],
});

const DETAILED_DISCOUNT = createElement({
  tagname: 'span',
  options: [['className', 'detailed__price']],
});

const DETAILED_PRICE_FIELD = createElement({
  tagname: 'div',
  childElements: [DETAILED_PRICE],
});

function getTitle(title: string) {
  DETAILED_TITLE.textContent = title;

  DETAILED_TEXT_COLUMN.prepend(DETAILED_TITLE);
}

function getText(text: string) {
  DETAILED_DESC_TEXT.textContent = text;

  DETAILED_TEXT_COLUMN.prepend(DETAILED_DESC_TEXT);
}

async function getDiscount(discount: number) {
  DETAILED_DISCOUNT.textContent = '';

  if (discount) {
    DETAILED_DISCOUNT.textContent = `${(discount / 100).toFixed(2)} $`;
    DETAILED_PRICE_FIELD.prepend(DETAILED_DISCOUNT);
    DETAILED_PRICE.classList.add('detailed__discount');
  }
}

function getPrice(price: number, discount?: number) {
  DETAILED_PRICE_FIELD.innerHTML = '';
  DETAILED_PRICE.textContent = '';
  DETAILED_PRICE.classList.remove('detailed__discount');
  DETAILED_PRICE_FIELD.append(DETAILED_PRICE);

  DETAILED_PRICE.textContent = `${(price / 100).toFixed(2)} $`;

  if (discount) {
    getDiscount(discount);
  }
}

DETAILED_TEXT_COLUMN.append(DETAILED_PRICE_FIELD);

async function getCarousel(images: Image[]) {
  const detailedCarouselImages = images;

  if (detailedCarouselImages) {
    const DETAILED_CAROUSEL_IMAGES = detailedCarouselImages.map((image) => {
      const DETAILED_CAROUSEL_IMAGE = createElement({
        tagname: 'img',
        options: [
          ['className', 'd-block w-100'],
          ['alt', `${image}`],
          ['src', image.url],
        ],
      });
      return DETAILED_CAROUSEL_IMAGE;
    });

    const DETAILED_CAROUSEL_ITEMS = DETAILED_CAROUSEL_IMAGES.map((image) => {
      const DETAILED_CAROUSEL_ITEM = createElement({
        tagname: 'div',
        options: [['className', 'carousel-item']],
        childElements: [image],
      });
      return DETAILED_CAROUSEL_ITEM;
    });

    DETAILED_CAROUSEL_ITEMS[0].classList.add('active');
    DETAILED_CAROUSEL_INNER.innerHTML = '';
    DETAILED_CAROUSEL_INNER.append(...DETAILED_CAROUSEL_ITEMS);
  }
}

export async function getDetailedInfo(id: string) {
  const product = (await getProduct(id)).body.masterData.current;
  const text = product.description?.en;
  const title = product.name.en;
  const { images } = product.masterVariant;
  const { categories } = product;
  const size: string = product.masterVariant.attributes?.[0].value;
  const price = product.masterVariant.prices?.[0].value.centAmount;
  const discount = product.masterVariant.prices?.[0].discounted?.value.centAmount;

  if (text && images && price) {
    getText(text);
    getCarousel(images);

    if (discount) {
      getPrice(price, discount);
    } else {
      getPrice(price);
    }
  }

  getTitle(title);
  getCharachteristics(categories, size);
}
