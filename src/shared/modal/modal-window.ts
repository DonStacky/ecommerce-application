import { Alert } from 'bootstrap';
import { createElement, findDomElement } from '../helpers/dom-utilites';

function closeModal() {
  if (document.querySelector('.modal-window')) {
    const modal = findDomElement(document.body, '.modal-window');

    if (modal) {
      modal.remove();
    }
  }
}

export default function showModal(success: boolean, title: string, description?: string) {
  closeModal();

  const SVG_SUCCESS_CONTAINER = createElement({
    tagname: 'div',
    options: [
      [
        'innerHTML',
        `<svg fill="currentColor" viewBox="0 0 16 16" class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </svg>`,
      ],
    ],
  });

  const SVG_FAILED_CONTAINER = createElement({
    tagname: 'div',
    options: [
      [
        'innerHTML',
        `<svg fill="currentColor" viewBox="0 0 16 16" class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:">
  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </svg>`,
      ],
    ],
  });

  if (!(SVG_SUCCESS_CONTAINER.firstElementChild instanceof SVGElement)) {
    throw new Error('SVG not found');
  }
  if (!(SVG_FAILED_CONTAINER.firstElementChild instanceof SVGElement)) {
    throw new Error('SVG not found');
  }

  const button = createElement({ tagname: 'button', options: [['className', 'btn-close']] });
  button.setAttribute('data-bs-dismiss', 'alert');
  button.setAttribute('aria-label', 'Close');

  const modal = createElement({
    tagname: 'div',
    options: [
      ['className', `modal-window alert alert-${success ? `success` : 'danger'} d-flex  alert-dismissible show fade`],
    ],
    childElements: [
      success ? SVG_SUCCESS_CONTAINER.firstElementChild : SVG_FAILED_CONTAINER.firstElementChild,
      createElement({
        tagname: 'div',
        options: [['className', 'row']],
        childElements: [
          createElement({
            tagname: 'div',
            options: [['textContent', success ? `Successfully ${title}` : `${title} failed`]],
          }),
          createElement({
            tagname: 'div',
            options: [['textContent', description]],
          }),
        ],
      }),

      button,
    ],
  });
  modal.setAttribute('role', 'alert');

  const alert = new Alert(modal);
  document.body.append(modal);

  setTimeout(() => {
    if (document.body.contains(modal)) {
      alert.close();
    }
  }, 5000);
}
