import { createElementBase } from '../../shared/helpers/dom-utilites';
import GetUserData from '../../shared/helpers/get-user-data';
import countries from '../registration/postal-codes';

export default class EditAddressForm extends GetUserData {
  CLOSE_BUTTON: HTMLButtonElement;

  BUTTONS: HTMLDivElement;

  SAVE_BUTTON: HTMLButtonElement;

  DELETE_BUTTON: HTMLButtonElement;

  FORM: HTMLFormElement;

  ADDRESS_HEADER: HTMLHeadingElement;

  COUNTRY_LABEL: HTMLLabelElement;

  COUNTRY_PRESELECTED_OPTION: HTMLOptionElement;

  COUNTRY_OPTIONS: HTMLOptionElement[];

  COUNTRY_INVALID: HTMLDivElement;

  COUNTRY_SELECT: HTMLSelectElement;

  COUNTRY_FIELD: HTMLDivElement;

  POSTAL_CODE_LABEL: HTMLLabelElement;

  POSTAL_CODE_INVALID: HTMLDivElement;

  POSTAL_CODE_INPUT: HTMLInputElement;

  POSTAL_CODE_FIELD: HTMLDivElement;

  CITY_LABEL: HTMLLabelElement;

  CITY_INVALID: HTMLDivElement;

  CITY_INPUT: HTMLInputElement;

  CITY_FIELD: HTMLDivElement;

  STREET_LABEL: HTMLLabelElement;

  STREET_INVALID: HTMLDivElement;

  STREET_INPUT: HTMLInputElement;

  STREET_FIELD: HTMLDivElement;

  SET_DEFAULT: HTMLInputElement;

  DEFAULT_LABEL: HTMLLabelElement;

  DEFAULT_OPTIONS: HTMLDivElement;

  addressId: string;

  addressType: string;

  constructor() {
    super();

    this.addressId = '';
    this.addressType = '';

    this.CLOSE_BUTTON = createElementBase('button', ['btn-close', 'close_align']);

    this.ADDRESS_HEADER = createElementBase('h2', ['address-header'], undefined, 'Address');

    this.COUNTRY_LABEL = createElementBase('label', ['form-label'], undefined, 'Country');
    this.COUNTRY_PRESELECTED_OPTION = createElementBase('option', [], undefined, 'Country...');
    this.COUNTRY_OPTIONS = countries.map(({ Country }) => {
      const element = createElementBase('option', [], undefined, Country);
      element.setAttribute('value', Country);
      return element;
    });
    this.COUNTRY_INVALID = createElementBase('div', ['invalid-feedback'], 'country-validation');
    this.COUNTRY_SELECT = createElementBase('select', ['form-control'], 'country');
    this.COUNTRY_FIELD = createElementBase('div', ['form-field']);

    this.POSTAL_CODE_LABEL = createElementBase('label', ['form-label'], undefined, 'Postal code');
    this.POSTAL_CODE_INVALID = createElementBase('div', ['invalid-feedback'], 'postal-code-validation');
    this.POSTAL_CODE_INPUT = createElementBase('input', ['form-control'], 'postalCode');
    this.POSTAL_CODE_FIELD = createElementBase('div', ['form-field']);

    this.CITY_LABEL = createElementBase('label', ['form-label'], undefined, 'City');
    this.CITY_INVALID = createElementBase('div', ['invalid-feedback'], 'city-validation');
    this.CITY_INPUT = createElementBase('input', ['form-control'], 'city');
    this.CITY_FIELD = createElementBase('div', ['form-field']);

    this.STREET_LABEL = createElementBase('label', ['form-label'], undefined, 'Street');
    this.STREET_INVALID = createElementBase('div', ['invalid-feedback'], 'street-validation');
    this.STREET_INPUT = createElementBase('input', ['form-control'], 'street');
    this.STREET_FIELD = createElementBase('div', ['form-field']);

    this.SET_DEFAULT = createElementBase('input', ['form-check-input'], 'default');
    this.DEFAULT_LABEL = createElementBase('label', ['form-check-label'], undefined, 'Set as default');
    this.DEFAULT_OPTIONS = createElementBase('div', ['form-field', 'form-check', 'form-switch']);

    this.BUTTONS = createElementBase('div', ['d-flex']);
    this.SAVE_BUTTON = createElementBase('button', ['submit-button', 'm-3'], undefined, 'Save');
    this.DELETE_BUTTON = createElementBase('button', ['delete-button', 'm-3'], undefined, 'Delete');

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
    this.COUNTRY_LABEL.setAttribute('for', `country`);
    this.COUNTRY_PRESELECTED_OPTION.setAttribute('selected', 'true');
    this.COUNTRY_PRESELECTED_OPTION.setAttribute('disabled', 'true');
    this.COUNTRY_PRESELECTED_OPTION.setAttribute('value', '');
    this.POSTAL_CODE_LABEL.setAttribute('for', `postalCode`);
    this.POSTAL_CODE_INPUT.setAttribute('type', `text`);
    this.CITY_LABEL.setAttribute('for', `city`);
    this.CITY_INPUT.setAttribute('type', `text`);
    this.STREET_LABEL.setAttribute('for', `street`);
    this.STREET_INPUT.setAttribute('type', `text`);
    this.SET_DEFAULT.setAttribute('type', `checkbox`);
    this.DEFAULT_LABEL.setAttribute('for', `default`);
    this.FORM.setAttribute('noValidate', 'true');
    this.SAVE_BUTTON.setAttribute('type', 'button');
    this.DELETE_BUTTON.setAttribute('type', 'button');
  }

  private appendElements() {
    this.COUNTRY_SELECT.append(this.COUNTRY_PRESELECTED_OPTION, ...this.COUNTRY_OPTIONS);
    this.COUNTRY_FIELD.append(this.ADDRESS_HEADER, this.COUNTRY_LABEL, this.COUNTRY_SELECT, this.COUNTRY_INVALID);
    this.POSTAL_CODE_FIELD.append(this.POSTAL_CODE_LABEL, this.POSTAL_CODE_INPUT, this.POSTAL_CODE_INVALID);
    this.CITY_FIELD.append(this.CITY_LABEL, this.CITY_INPUT, this.CITY_INVALID);
    this.STREET_FIELD.append(this.STREET_LABEL, this.STREET_INPUT, this.STREET_INVALID);
    this.DEFAULT_OPTIONS.append(this.SET_DEFAULT, this.DEFAULT_LABEL);
    this.BUTTONS.append(this.SAVE_BUTTON, this.DELETE_BUTTON);
    this.FORM.append(
      this.CLOSE_BUTTON,
      this.COUNTRY_FIELD,
      this.POSTAL_CODE_FIELD,
      this.CITY_FIELD,
      this.STREET_FIELD,
      this.DEFAULT_OPTIONS,
      this.BUTTONS
    );
  }
}
