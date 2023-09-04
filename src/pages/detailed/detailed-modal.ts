import { createElement } from '../../shared/helpers/dom-utilites';

const CLOSE_BTN = createElement({
  tagname: 'button',
  options: [
    ['className', 'btn-close detailed__modal-close'],
    ['ariaLabel', 'Close'],
    ['type', 'button'],
  ],
});
CLOSE_BTN.dataset.bsDismiss = 'modal';

export const MODAL_BODY = createElement({
  tagname: 'div',
  options: [['className', 'modal-body detailed-modal-body']],
  childElements: [CLOSE_BTN],
});

const MODAL_CONTENT = createElement({
  tagname: 'div',
  options: [['className', 'modal-content']],
  childElements: [MODAL_BODY],
});

const MODAL_DIALOG = createElement({
  tagname: 'div',
  options: [['className', 'modal-dialog detailed-modal-dialog modal-dialog-centered']],
  childElements: [MODAL_CONTENT],
});

export const MODAL = createElement({
  tagname: 'div',
  options: [
    ['className', 'modal detailed-modal container-xl fade'],
    ['id', 'detailed-modal'],
    ['tabIndex', '-1'],
    ['ariaHidden', 'true'],
  ],
  childElements: [MODAL_DIALOG],
});
