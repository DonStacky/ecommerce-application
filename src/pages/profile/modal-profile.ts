import { createElementBase } from '../../shared/helpers/dom-utilites';
import EditProfileForm from './edit-profile-form';

export default class ModalProfileChange {
  MODAL_CONTAINER: HTMLDivElement;

  MODAL_DIALOG: HTMLDivElement;

  MODAL_CONTENT: HTMLDivElement;

  MODAL_FOOTER: HTMLDivElement;

  CLOSE_BUTTON: HTMLButtonElement;

  SAVE_BUTTON: HTMLButtonElement;

  constructor() {
    this.MODAL_CONTAINER = createElementBase('div', ['modal', 'fade'], 'profileModal');
    this.MODAL_DIALOG = createElementBase('div', ['modal-dialog', 'modal-dialog_width']);
    this.MODAL_CONTENT = createElementBase('div', ['modal-content', 'modal-content_border']);
    this.MODAL_FOOTER = createElementBase('div', ['modal-footer']);
    this.CLOSE_BUTTON = createElementBase('button', ['btn', 'btn-secondary'], undefined, 'Closed');
    this.SAVE_BUTTON = createElementBase('button', ['btn', 'btn-primary'], undefined, 'Save');

    this.MODAL_CONTAINER.setAttribute('tabindex', '-1');
    this.MODAL_CONTAINER.setAttribute('aria-labelledby', 'profileModalLabel');
    this.MODAL_CONTAINER.setAttribute('aria-hidden', 'true');
    this.CLOSE_BUTTON.setAttribute('data-bs-dismiss', 'modal');

    this.appendElements();
  }

  private appendElements() {
    this.MODAL_CONTENT.append(new EditProfileForm().FORM /* createEditProfileForm() */);
    this.MODAL_DIALOG.append(this.MODAL_CONTENT);
    this.MODAL_CONTAINER.append(this.MODAL_DIALOG);
  }
}
