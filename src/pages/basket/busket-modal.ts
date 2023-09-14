import { Modal } from 'bootstrap';
import { createElementBase } from '../../shared/helpers/dom-utilites';

export default class BusketModal {
  MODAL: HTMLDivElement;

  MODAL_DIALOG: HTMLDivElement;

  MODAL_CONTENT: HTMLDivElement;

  MODAL_HEADER: HTMLDivElement;

  MODAL_TITLE: HTMLHeadingElement;

  BUTTON_CLOSE: HTMLButtonElement;

  MODAL_BODY: HTMLDivElement;

  MODAL_FOOTER: HTMLDivElement;

  BUTTON_NO: HTMLButtonElement;

  BUTTON_YES: HTMLButtonElement;

  modal: Modal | undefined;

  constructor() {
    this.MODAL = createElementBase('div', ['modal', 'fade'], 'busketModal');
    this.MODAL_DIALOG = createElementBase('div', ['modal-dialog', 'modal-sm']);
    this.MODAL_CONTENT = createElementBase('div', ['modal-content']);
    this.MODAL_HEADER = createElementBase('div', ['modal-header']);
    this.MODAL_TITLE = createElementBase('h5', ['modal-title'], 'busketModalLabel', 'Deleting the shopping cart');
    this.BUTTON_CLOSE = createElementBase('button', ['btn-close']);
    this.MODAL_BODY = createElementBase('div', ['modal-body'], undefined, 'You want to delete the entire cart?');
    this.MODAL_FOOTER = createElementBase('div', ['modal-footer']);
    this.BUTTON_NO = createElementBase('button', ['btn', 'btn-secondary'], undefined, 'No');
    this.BUTTON_YES = createElementBase('button', ['btn', 'btn-primary'], undefined, 'Yes');

    this.setAttributes();
    this.appendElements();

    setTimeout(() => {
      this.modal = new Modal(this.MODAL);
    });
  }

  private setAttributes() {
    this.MODAL.setAttribute('tabindex', '-1');
    this.MODAL.setAttribute('aria-labelledby', 'busketModalLabel');
    this.MODAL.setAttribute('aria-hidden', 'true');
    this.BUTTON_CLOSE.setAttribute('data-bs-dismiss', 'modal');
    this.BUTTON_CLOSE.setAttribute('aria-label', 'Close');
    this.BUTTON_NO.setAttribute('data-bs-dismiss', 'modal');
  }

  private appendElements() {
    this.MODAL_HEADER.append(this.MODAL_TITLE, this.BUTTON_CLOSE);
    this.MODAL_FOOTER.append(this.BUTTON_YES, this.BUTTON_NO);
    this.MODAL_CONTENT.append(this.MODAL_HEADER, this.MODAL_BODY, this.MODAL_FOOTER);
    this.MODAL_DIALOG.append(this.MODAL_CONTENT);
    this.MODAL.append(this.MODAL_DIALOG);
  }
}
