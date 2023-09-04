import { createElement } from '../../shared/helpers/dom-utilites';
import { getCategories, getProduct } from './detailed-data';
import { MODAL, MODAL_BODY } from './detailed-modal';
import './detailed-page.scss';

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

const charachteristics = ['Material', 'Season', 'Category', 'Size'];

const CHARACTER_DTS = charachteristics.map((text) => {
  const CHARACTER_DT = createElement({
    tagname: 'dt',
    options: [
      ['className', 'detailed__term'],
      ['textContent', `${text}`],
    ],
  });

  return CHARACTER_DT;
});

const CHARACTER_DDS = charachteristics.map(() => {
  const CHARACTER_DD = createElement({
    tagname: 'dd',
    options: [['className', 'detailed__description']],
  });

  return CHARACTER_DD;
});

async function getCharachteristics(id: string) {
  const categoriesID = (await getProduct(id)).body.masterData.current.categories;

  const categories = categoriesID.map(async (item) => {
    return (await getCategories(item.id)).body.name;
  });

  CHARACTER_DDS.forEach(async (dd, index) => {
    const definitionDescription = dd;

    if (index < 3) {
      definitionDescription.textContent = (await categories[index]).en;
    } else {
      definitionDescription.textContent = (
        await getProduct(id)
      ).body.masterData.current.masterVariant.attributes?.[0].value;
    }
  });
}

const CHARACTER_DLS = charachteristics.map((stub, index) => {
  const CHARACTER_DL = createElement({
    tagname: 'dl',
    options: [['className', 'detailed__list']],
    childElements: [CHARACTER_DTS[index], CHARACTER_DDS[index]],
  });

  return CHARACTER_DL;
});

const DETAILED_CHARACTER = createElement({
  tagname: 'div',
  options: [
    ['className', 'characteristic-wrapper'],
    ['id', 'detailedCharacteristic'],
  ],
  childElements: [...CHARACTER_DLS],
});

const DETAILED_CHARACTER_LINK = createElement({
  tagname: 'span',
  options: [
    ['className', 'characteristic-link mb-3'],
    ['textContent', 'Characteristics'],
    ['ariaExpanded', 'false'],
  ],
});

DETAILED_CHARACTER_LINK.addEventListener('click', () => {
  DETAILED_CHARACTER.classList.toggle('characteristic-wrapper--show');
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

DETAILED_TEXT_COLUMN.append(DETAILED_CHARACTER_LINK, DETAILED_CHARACTER);

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

function getTitle(id: string) {
  getProduct(id).then(({ body }) => {
    DETAILED_TITLE.textContent = body.masterData.current.name.en;
  });

  DETAILED_TEXT_COLUMN.prepend(DETAILED_TITLE);
}

function getText(id: string) {
  getProduct(id).then(({ body }) => {
    const text = body.masterData.current.description?.en;
    if (text) {
      DETAILED_DESC_TEXT.textContent = text;
    }
  });

  DETAILED_TEXT_COLUMN.prepend(DETAILED_DESC_TEXT);
}

async function getDiscount(id: string) {
  DETAILED_DISCOUNT.textContent = '';
  const discountCent = (await getProduct(id)).body.masterData.current.masterVariant.prices?.[0].discounted?.value
    .centAmount;

  if (discountCent) {
    DETAILED_DISCOUNT.textContent = `${(discountCent / 100).toFixed(2)} $`;
    DETAILED_PRICE_FIELD.prepend(DETAILED_DISCOUNT);
    DETAILED_PRICE.classList.add('detailed__discount');
  }
}

function getPrice(id: string) {
  DETAILED_PRICE_FIELD.innerHTML = '';
  DETAILED_PRICE.textContent = '';
  DETAILED_PRICE.classList.remove('detailed__discount');
  DETAILED_PRICE_FIELD.append(DETAILED_PRICE);

  getProduct(id).then(({ body }) => {
    const priceCent = body.masterData.current.masterVariant.prices?.[0].value.centAmount;

    if (priceCent) {
      DETAILED_PRICE.textContent = `${(priceCent / 100).toFixed(2)} $`;
    }
  });

  getDiscount(id);
}

DETAILED_TEXT_COLUMN.append(DETAILED_PRICE_FIELD);

async function getCarousel(id: string) {
  const detailedCarouselImages = (await getProduct(id)).body.masterData.current.masterVariant.images;

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

export function getDetailedInfo(id: string) {
  getText(id);
  getTitle(id);
  getCarousel(id);
  getCharachteristics(id);
  getPrice(id);

  return [id];
}
