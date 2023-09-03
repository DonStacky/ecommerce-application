import { createElement } from '../../shared/helpers/dom-utilites';
// import { DETAILED_CAROUSEL } from './detailed-data';

// <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//   <div class="modal-dialog">
//     <div class="modal-content">
//       <div class="modal-header">
//         <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
//         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//       </div>
//       <div class="modal-body">
//         ...
//       </div>
//       <div class="modal-footer">
//         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//         <button type="button" class="btn btn-primary">Save changes</button>
//       </div>
//     </div>
//   </div>
// </div>

const CLOSE_BTN = createElement({
  tagname: 'button',
  options: [
    ['className', 'btn-close detailed__modal-close'],
    ['ariaLabel', 'Close'],
    ['type', 'button'],
  ],
});
CLOSE_BTN.dataset.bsDismiss = 'modal';

// const MODAL_HEADER = createElement({
//   tagname: 'div',
//   options: [['className', 'modal-header']],
//   childElements: [CLOSE_BTN],
// });

export const MODAL_BODY = createElement({
  tagname: 'div',
  options: [['className', 'modal-body']],
  childElements: [CLOSE_BTN],
});

const MODAL_CONTENT = createElement({
  tagname: 'div',
  options: [['className', 'modal-content']],
  childElements: [MODAL_BODY],
});

const MODAL_DIALOG = createElement({
  tagname: 'div',
  options: [['className', 'modal-dialog modal-dialog-centered']],
  childElements: [MODAL_CONTENT],
});

export const MODAL = createElement({
  tagname: 'div',
  options: [
    ['className', 'modal container-xl fade'],
    ['id', 'detailed-modal'],
    ['tabIndex', '-1'],
    ['ariaHidden', 'true'],
  ],
  childElements: [MODAL_DIALOG],
});
