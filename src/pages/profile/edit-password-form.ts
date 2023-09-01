import { createElementBase } from '../../shared/helpers/dom-utilites';
import GetUserData from '../../shared/helpers/get-user-data';

export default class EditPasswordForm extends GetUserData {
  CLOSE_BUTTON: HTMLButtonElement;

  OLD_PASSWORD_LABEL: HTMLLabelElement;

  OLD_PASSWORD_INVALID: HTMLDivElement;

  OLD_PASSWORD_INPUT: HTMLInputElement;

  OLD_PASSWORD_FIELD: HTMLDivElement;

  NEW_PASSWORD_LABEL: HTMLLabelElement;

  NEW_PASSWORD_INVALID: HTMLDivElement;

  NEW_PASSWORD_INPUT: HTMLInputElement;

  NEW_PASSWORD_FIELD: HTMLDivElement;

  REPEAT_NEW_PASSWORD_LABEL: HTMLLabelElement;

  REPEAT_NEW_PASSWORD_INVALID: HTMLDivElement;

  REPEAT_NEW_PASSWORD_INPUT: HTMLInputElement;

  REPEAT_NEW_PASSWORD_FIELD: HTMLDivElement;

  SAVE_BUTTON: HTMLButtonElement;

  FORM: HTMLFormElement;

  constructor() {
    super();

    this.CLOSE_BUTTON = createElementBase('button', ['btn-close', 'close_align']);

    this.OLD_PASSWORD_LABEL = createElementBase('label', ['form-label'], undefined, 'Curent password');
    this.OLD_PASSWORD_INVALID = createElementBase('div', ['invalid-feedback'], 'password-validation');
    this.OLD_PASSWORD_INPUT = createElementBase('input', ['form-control'], 'oldPassword');
    this.OLD_PASSWORD_FIELD = createElementBase('div', ['form-field']);

    this.NEW_PASSWORD_LABEL = createElementBase('label', ['form-label'], undefined, 'New password');
    this.NEW_PASSWORD_INVALID = createElementBase('div', ['invalid-feedback'], 'password-validation');
    this.NEW_PASSWORD_INPUT = createElementBase('input', ['form-control'], 'newPassword');
    this.NEW_PASSWORD_FIELD = createElementBase('div', ['form-field']);

    this.REPEAT_NEW_PASSWORD_LABEL = createElementBase('label', ['form-label'], undefined, 'Repeat new password');
    this.REPEAT_NEW_PASSWORD_INVALID = createElementBase('div', ['invalid-feedback'], 'password-validation');
    this.REPEAT_NEW_PASSWORD_INPUT = createElementBase('input', ['form-control'], 'repeatNewPassword');
    this.REPEAT_NEW_PASSWORD_FIELD = createElementBase('div', ['form-field']);

    this.SAVE_BUTTON = createElementBase('button', ['submit-button', 'm-3'], undefined, 'Save');

    this.FORM = createElementBase('form', [
      'registration-form',
      'form-style',
      'needs-validation',
      'container-xl',
      'me-auto',
      'ms-auto',
      'col-10',
      'col-sm-8',
      'col-md-6',
      'modal-form',
    ]);

    this.addAttributes();
    this.appendElements();
  }

  private addAttributes() {
    this.CLOSE_BUTTON.setAttribute('type', `button`);
    this.CLOSE_BUTTON.setAttribute('data-bs-dismiss', 'modal');
    this.CLOSE_BUTTON.setAttribute('area-label', 'Close');
    this.OLD_PASSWORD_LABEL.setAttribute('for', `oldPassword`);
    this.OLD_PASSWORD_INPUT.setAttribute('type', `password`);
    this.NEW_PASSWORD_LABEL.setAttribute('for', `newPassword`);
    this.NEW_PASSWORD_INPUT.setAttribute('type', `password`);
    this.REPEAT_NEW_PASSWORD_INPUT.setAttribute('type', `password`);
    this.REPEAT_NEW_PASSWORD_LABEL.setAttribute('for', `repeatNewPassword`);
    this.FORM.setAttribute('noValidate', 'true');
    this.SAVE_BUTTON.setAttribute('type', 'button');
  }

  private appendElements() {
    this.OLD_PASSWORD_FIELD.append(this.OLD_PASSWORD_LABEL, this.OLD_PASSWORD_INPUT, this.OLD_PASSWORD_INVALID);
    this.NEW_PASSWORD_FIELD.append(this.NEW_PASSWORD_LABEL, this.NEW_PASSWORD_INPUT, this.NEW_PASSWORD_INVALID);
    this.REPEAT_NEW_PASSWORD_FIELD.append(
      this.REPEAT_NEW_PASSWORD_LABEL,
      this.REPEAT_NEW_PASSWORD_INPUT,
      this.REPEAT_NEW_PASSWORD_INVALID
    );
    this.FORM.append(
      this.CLOSE_BUTTON,
      this.OLD_PASSWORD_FIELD,
      this.NEW_PASSWORD_FIELD,
      this.REPEAT_NEW_PASSWORD_FIELD,
      this.SAVE_BUTTON
    );
  }
}
