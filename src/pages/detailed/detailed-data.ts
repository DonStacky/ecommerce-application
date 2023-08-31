import { createElement } from '../../shared/helpers/dom-utilites';
import getProduct from './detailed-page';
import router from '../../app/router/router';
import './detailed-page.scss';

const DETAILED_TEXT_COLUMN = createElement({
  tagname: 'div',
  options: [
    [
      'className',
      'col text-center col-sm-6 col-12 d-flex flex-column justify-content-center align-items-start detailed__text',
    ],
  ],
});

const DETAILED_TITLE = createElement({
  tagname: 'h1',
  options: [['className', 'text-dark']],
});

const DETAILED_DESC_TEXT = createElement({
  tagname: 'p',
  options: [['className', 'text-dark mt-5 me-5 text-start']],
});

const DETAILED_CAROUSEL_INNER = createElement({
  tagname: 'div',
  options: [['className', 'carousel-inner w-75']],
});

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

const DETAILED_CAROUSEL = createElement({
  tagname: 'div',
  options: [
    ['className', 'detailed__carousel carousel carousel-dark slide d-flex justify-content-center'],
    ['id', 'carouselDetailed'],
  ],
  childElements: [DETAILED_CAROUSEL_INNER, BUTTON_PREV, BUTTON_NEXT],
});

const DETAILED_CAROUSEL_COLUMN = createElement({
  tagname: 'div',
  options: [['className', 'col col-sm-6 col-12']],
  childElements: [DETAILED_CAROUSEL],
});

const DETAILED_GRID_ROW = createElement({
  tagname: 'div',
  options: [['className', 'row detailed__products-row']],
  childElements: [DETAILED_CAROUSEL_COLUMN, DETAILED_TEXT_COLUMN],
});

export const DETAILED_PAGE = createElement({
  tagname: 'div',
  options: [['className', 'detailed']],
  childElements: [DETAILED_GRID_ROW],
});

function getTitle(id: string) {
  getProduct(id)
    .then(({ body }) => {
      DETAILED_TITLE.textContent = body.masterData.current.name.en;
    })
    .catch(console.error);

  DETAILED_TEXT_COLUMN.append(DETAILED_TITLE);
}

function getText(id: string) {
  getProduct(id)
    .then(({ body }) => {
      const text = body.masterData.current.description?.en;
      if (text) {
        DETAILED_DESC_TEXT.textContent = text;
      }
    })
    .catch(console.error);

  DETAILED_TEXT_COLUMN.append(DETAILED_DESC_TEXT);
}

async function getCarousel(id: string) {
  const detailedCarouselImages = (await getProduct(id)).body.masterData.current.masterVariant.images;
  console.log(detailedCarouselImages);

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
        options: [['className', 'carousel-item active']],
        childElements: [image],
      });
      return DETAILED_CAROUSEL_ITEM;
    });

    DETAILED_CAROUSEL_INNER.innerHTML = '';
    DETAILED_CAROUSEL_INNER.append(...DETAILED_CAROUSEL_ITEMS);
  }
}

export function getDetailedInfo(id: string) {
  getTitle(id);
  getText(id);
  getCarousel(id);

  return [id];
}

export function openDetailedPage(promiseID: Promise<string | void>) {
  router.navigate('/detailed');
  promiseID.then((id) => {
    if (id) {
      // localStorage.setItem('currentProduct', id);
      getDetailedInfo(id);
    }
  });
}
