import { createElementBase } from '../../shared/helpers/dom-utilites';
import GetUserData from '../../shared/helpers/get-user-data';
import {
  birthDateValidation,
  firstNameValidation,
  lastNameValidation,
  loginValidation,
} from '../../shared/helpers/validation';
import { UserValidateResault, UserValidateResaultIndex, UserValidation } from './types';

export default class EditUserForm extends GetUserData {
  validationResults: UserValidation;

  CLOSE_BUTTON: HTMLButtonElement;

  NAME_LABEL: HTMLLabelElement;

  NAME_INVALID: HTMLDivElement;

  NAME_INPUT: HTMLInputElement;

  NAME_FIELD: HTMLDivElement;

  LAST_NAME_LABEL: HTMLLabelElement;

  LAST_NAME_INVALID: HTMLDivElement;

  LAST_NAME_INPUT: HTMLInputElement;

  LAST_NAME_FIELD: HTMLDivElement;

  EMAIL_LABEL: HTMLLabelElement;

  EMAIL_SYMBOL: HTMLSpanElement;

  EMAIL_INVALID: HTMLDivElement;

  EMAIL_INPUT: HTMLInputElement;

  EMAIL_INPUT_GROUP: HTMLDivElement;

  EMAIL_FIELD: HTMLDivElement;

  BIRTH_DATE_LABEL: HTMLLabelElement;

  BIRTH_DATE_INVALID: HTMLDivElement;

  BIRTH_DATE_INPUT: HTMLInputElement;

  BIRTH_DATE_FIELD: HTMLDivElement;

  SAVE_BUTTON: HTMLButtonElement;

  FORM: HTMLFormElement;

  constructor() {
    super();

    this.validationResults = {
      firstName: true,
      lastName: true,
      email: true,
      birthDate: true,
    };

    this.CLOSE_BUTTON = createElementBase('button', ['btn-close', 'close_align']);
    this.NAME_LABEL = createElementBase('label', ['form-label'], undefined, 'First name');
    this.NAME_INVALID = createElementBase('div', ['form-text', 'form-text_width']);
    this.NAME_INPUT = createElementBase('input', ['form-control'], 'profileFirstName');
    this.NAME_FIELD = createElementBase('div', ['form-field']);

    this.LAST_NAME_LABEL = createElementBase('label', ['form-label'], undefined, 'Last name');
    this.LAST_NAME_INVALID = createElementBase('div', ['form-text', 'form-text_width']);
    this.LAST_NAME_INPUT = createElementBase('input', ['form-control'], 'profileLastName');
    this.LAST_NAME_FIELD = createElementBase('div', ['form-field']);

    this.EMAIL_LABEL = createElementBase('label', ['form-label'], undefined, 'Email');
    this.EMAIL_SYMBOL = createElementBase('span', ['input-group-text'], 'inputGroupPrepend', '@');
    this.EMAIL_INVALID = createElementBase('div', ['form-text', 'form-text_width']);
    this.EMAIL_INPUT = createElementBase('input', ['form-control'], 'profileEmail');
    this.EMAIL_INPUT_GROUP = createElementBase('div', ['input-group', 'has-validation']);
    this.EMAIL_FIELD = createElementBase('div', ['form-field']);

    this.BIRTH_DATE_LABEL = createElementBase('label', ['form-label'], undefined, 'Birth date');
    this.BIRTH_DATE_INVALID = createElementBase('div', ['form-text', 'form-text_width']);
    this.BIRTH_DATE_INPUT = createElementBase('input', ['form-control'], 'profileBirthDate');
    this.BIRTH_DATE_FIELD = createElementBase('div', ['form-field']);

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
    this.fillFields();
    this.FORM.addEventListener('input', this.liveValidation.bind(this));
  }

  private addAttributes() {
    this.CLOSE_BUTTON.setAttribute('type', `button`);
    this.CLOSE_BUTTON.setAttribute('data-bs-dismiss', 'modal');
    this.CLOSE_BUTTON.setAttribute('area-label', 'Close');
    this.NAME_LABEL.setAttribute('for', `profileFirstName`);
    this.NAME_INPUT.setAttribute('type', `text`);
    this.LAST_NAME_LABEL.setAttribute('for', `lastName`);
    this.LAST_NAME_INPUT.setAttribute('type', `text`);
    this.EMAIL_LABEL.setAttribute('for', `profileEmail`);
    this.EMAIL_INPUT.setAttribute('type', `text`);
    this.EMAIL_INPUT.setAttribute('aria-describedby', 'inputGroupPrepend');
    this.BIRTH_DATE_LABEL.setAttribute('for', `profileBirthDate`);
    this.BIRTH_DATE_INPUT.setAttribute('type', `date`);
    this.FORM.setAttribute('noValidate', 'true');
    this.SAVE_BUTTON.setAttribute('type', 'button');
    this.SAVE_BUTTON.setAttribute('disabled', '');
  }

  private appendElements() {
    this.NAME_FIELD.append(this.NAME_LABEL, this.NAME_INPUT, this.NAME_INVALID);
    this.LAST_NAME_FIELD.append(this.LAST_NAME_LABEL, this.LAST_NAME_INPUT, this.LAST_NAME_INVALID);
    this.EMAIL_INPUT_GROUP.append(this.EMAIL_SYMBOL, this.EMAIL_INPUT, this.EMAIL_INVALID);
    this.EMAIL_FIELD.append(this.EMAIL_LABEL, this.EMAIL_INPUT_GROUP);
    this.BIRTH_DATE_FIELD.append(this.BIRTH_DATE_LABEL, this.BIRTH_DATE_INPUT, this.BIRTH_DATE_INVALID);
    this.FORM.append(
      this.CLOSE_BUTTON,
      this.NAME_FIELD,
      this.LAST_NAME_FIELD,
      this.EMAIL_FIELD,
      this.BIRTH_DATE_FIELD,
      this.SAVE_BUTTON
    );
  }

  private fillFields() {
    this.NAME_INPUT.value = this.getFirstName();
    this.LAST_NAME_INPUT.value = this.getLastName();
    this.EMAIL_INPUT.value = this.getEmail();
    this.BIRTH_DATE_INPUT.value = this.getBirthday();
  }

  private liveValidation(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.tagName !== 'INPUT') return;

    const text = target.value;

    if (target.id === 'profileFirstName') {
      const validation = firstNameValidation({ title: text });

      this.applyValidation(validation, this.NAME_INVALID, target, 'firstName');
    }

    if (target.id === 'profileLastName') {
      const validation = lastNameValidation({ title: text });

      this.applyValidation(validation, this.LAST_NAME_INVALID, target, 'lastName');
    }

    if (target.id === 'profileEmail') {
      const validation = loginValidation({ title: text });

      this.applyValidation(validation, this.EMAIL_INVALID, target, 'firstName');
    }

    if (target.id === 'profileBirthDate') {
      const validation = birthDateValidation({ title: new Date(text) });

      this.applyValidation(validation, this.BIRTH_DATE_INVALID, target, 'birthDate');
    }

    this.createBtnStatus(this.validationResults);
  }

  private applyValidation(
    validation: UserValidateResault,
    element: HTMLDivElement,
    target: HTMLInputElement,
    validationResultsIndex: UserValidateResaultIndex
  ) {
    const ELEMENT = element;
    if (typeof validation === 'string') {
      ELEMENT.innerText = validation;
      target.classList.add('form-control_validation');
      this.validationResults[validationResultsIndex] = false;
    } else {
      target.classList.remove('form-control_validation');
      ELEMENT.innerText = '';
      this.validationResults[validationResultsIndex] = true;
    }
  }

  private createBtnStatus(validationData: UserValidation) {
    if (validationData.firstName && validationData.lastName && validationData.email && validationData.birthDate) {
      this.SAVE_BUTTON.removeAttribute('disabled');
    } else {
      this.SAVE_BUTTON.setAttribute('disabled', '');
    }
  }
}
