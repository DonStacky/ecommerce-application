import * as yup from 'yup';
import { createElementBase } from '../../shared/helpers/dom-utilites';
import GetUserData from '../../shared/helpers/get-user-data';
import { cityValidation, countryValidation, streetValidation } from '../../shared/helpers/validation';
import { findCountry } from '../registration/form-validation';
import countries from '../registration/postal-codes';
import { AddressValidateResault, AddressValidateResaultIndex, AddressValidation } from './types';

export default class EditAddressForm extends GetUserData {
  validationResults: AddressValidation;

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

    this.validationResults = {
      country: false,
      postalCode: false,
      city: false,
      street: false,
    };

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
    this.COUNTRY_INVALID = createElementBase('div', ['form-text', 'form-text_width']);
    this.COUNTRY_SELECT = createElementBase('select', ['form-control'], 'profileCountry');
    this.COUNTRY_FIELD = createElementBase('div', ['form-field']);

    this.POSTAL_CODE_LABEL = createElementBase('label', ['form-label'], undefined, 'Postal code');
    this.POSTAL_CODE_INVALID = createElementBase('div', ['form-text', 'form-text_width']);
    this.POSTAL_CODE_INPUT = createElementBase('input', ['form-control'], 'profilePostalCode');
    this.POSTAL_CODE_FIELD = createElementBase('div', ['form-field']);

    this.CITY_LABEL = createElementBase('label', ['form-label'], undefined, 'City');
    this.CITY_INVALID = createElementBase('div', ['form-text', 'form-text_width']);
    this.CITY_INPUT = createElementBase('input', ['form-control'], 'profileCity');
    this.CITY_FIELD = createElementBase('div', ['form-field']);

    this.STREET_LABEL = createElementBase('label', ['form-label'], undefined, 'Street');
    this.STREET_INVALID = createElementBase('div', ['form-text', 'form-text_width']);
    this.STREET_INPUT = createElementBase('input', ['form-control'], 'profileStreet');
    this.STREET_FIELD = createElementBase('div', ['form-field']);

    this.SET_DEFAULT = createElementBase('input', ['form-check-input'], 'profileDefault');
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
    this.FORM.addEventListener('input', this.liveValidation.bind(this));
  }

  private addAttributes() {
    this.CLOSE_BUTTON.setAttribute('type', `button`);
    this.CLOSE_BUTTON.setAttribute('data-bs-dismiss', 'modal');
    this.CLOSE_BUTTON.setAttribute('area-label', 'Close');
    this.COUNTRY_LABEL.setAttribute('for', `profileCountry`);
    this.COUNTRY_PRESELECTED_OPTION.setAttribute('selected', 'true');
    this.COUNTRY_PRESELECTED_OPTION.setAttribute('disabled', 'true');
    this.COUNTRY_PRESELECTED_OPTION.setAttribute('value', '');
    this.POSTAL_CODE_LABEL.setAttribute('for', `profilePostalCode`);
    this.POSTAL_CODE_INPUT.setAttribute('type', `text`);
    this.CITY_LABEL.setAttribute('for', `profileCity`);
    this.CITY_INPUT.setAttribute('type', `text`);
    this.STREET_LABEL.setAttribute('for', `profileStreet`);
    this.STREET_INPUT.setAttribute('type', `text`);
    this.SET_DEFAULT.setAttribute('type', `checkbox`);
    this.DEFAULT_LABEL.setAttribute('for', `profileDefault`);
    this.FORM.setAttribute('noValidate', 'true');
    this.SAVE_BUTTON.setAttribute('type', 'button');
    this.SAVE_BUTTON.setAttribute('disabled', '');
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

  private liveValidation(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.tagName !== 'INPUT' && target.id !== 'profileCountry') return;

    const postalCodeSchema = yup.object().shape({
      title: yup
        .string()
        .required()
        .matches(
          new RegExp(findCountry(this.COUNTRY_SELECT.value).Regex),
          `Please enter correct postal code. Postal code should be a format of ${
            findCountry(this.COUNTRY_SELECT.value).Format
          }`
        ),
    });

    const postalCodeValidation = (postalCode: yup.InferType<typeof postalCodeSchema>) => {
      try {
        const validate = postalCodeSchema.validateSync(postalCode);
        return validate;
      } catch (error) {
        return (error as Error).message;
      }
    };

    const text = target.value;

    if ((target as HTMLInputElement).id === 'profileCity') {
      const validation = cityValidation({ title: text });

      this.applyValidation(validation, this.CITY_INVALID, target, 'city');
    }

    if ((target as HTMLInputElement).id === 'profileStreet') {
      const validation = streetValidation({ title: text });

      this.applyValidation(validation, this.STREET_INVALID, target, 'street');
    }

    if (target.id === 'profileCountry') {
      const validation = postalCodeValidation({ title: this.POSTAL_CODE_INPUT.value });

      this.applyValidation(validation, this.POSTAL_CODE_INVALID, this.POSTAL_CODE_INPUT, 'postalCode');
    }

    if ((target as HTMLInputElement).id === 'profilePostalCode') {
      const validation = postalCodeValidation({ title: text });

      this.applyValidation(validation, this.POSTAL_CODE_INVALID, target, 'postalCode');
    }

    const validation = countryValidation({ title: this.COUNTRY_SELECT.value });
    this.applyValidation(validation, this.COUNTRY_INVALID, this.COUNTRY_SELECT, 'country');

    this.createBtnStatus(this.validationResults);
  }

  private applyValidation(
    validation: AddressValidateResault,
    element: HTMLDivElement,
    target: HTMLElement,
    validationResultsIndex: AddressValidateResaultIndex
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

  private createBtnStatus(validationData: AddressValidation) {
    if (validationData.country && validationData.postalCode && validationData.city && validationData.street) {
      this.SAVE_BUTTON.removeAttribute('disabled');
    } else {
      this.SAVE_BUTTON.setAttribute('disabled', '');
    }
  }
}
