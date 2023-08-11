import { createElement } from '../../shared/helpers/dom-utilites';
import 'bootstrap';

const REGISTRATION_HEADER = createElement({
  tagname: 'h1',
  options: [
    ['textContent', 'Registration'],
    ['className', 'form-header'],
  ],
});

const ADDRESS_HEADER_BILLING = createElement({
  tagname: 'h2',
  options: [
    ['textContent', 'Billing address'],
    ['className', 'address-header'],
  ],
});

const ADDRESS_HEADER_SHIPPING = createElement({
  tagname: 'h2',
  options: [
    ['textContent', 'Shipping address'],
    ['className', 'address-header'],
  ],
});

const NAME_LABEL = createElement({
  tagname: 'label',
  options: [
    ['htmlFor', 'firstName'],
    ['className', 'form-label'],
    ['textContent', 'First name'],
  ],
});

const NAME_INPUT = createElement({
  tagname: 'input',
  options: [
    ['id', 'firstName'],
    ['className', 'form-control'],
    ['type', 'text'],
  ],
});

const NAME_INVALID = createElement({
  tagname: 'div',
  options: [['className', 'invalid-feedback']],
});

const NAME_FIELD = createElement({
  tagname: 'div',
  options: [['className', 'form-field']],
  childElements: [NAME_LABEL, NAME_INPUT, NAME_INVALID],
});

const LAST_NAME_LABEL = createElement({
  tagname: 'label',
  options: [
    ['htmlFor', 'lastName'],
    ['className', 'form-label'],
    ['textContent', 'Last name'],
  ],
});

const LAST_NAME_INPUT = createElement({
  tagname: 'input',
  options: [
    ['id', 'lastName'],
    ['className', 'form-control'],
    ['type', 'text'],
  ],
});

const LAST_NAME_INVALID = createElement({
  tagname: 'div',
  options: [['className', 'invalid-feedback']],
});

const LAST_NAME_FIELD = createElement({
  tagname: 'div',
  options: [['className', 'form-field']],
  childElements: [LAST_NAME_LABEL, LAST_NAME_INPUT, LAST_NAME_INVALID],
});

const EMAIL_LABEL = createElement({
  tagname: 'label',
  options: [
    ['htmlFor', 'email'],
    ['className', 'form-label'],
    ['textContent', 'Email'],
  ],
});

const EMAIL_SYMBOL = createElement({
  tagname: 'span',
  options: [
    ['id', 'inputGroupPrepend'],
    ['className', 'input-group-text'],
    ['textContent', '@'],
  ],
});

const EMAIL_INPUT = createElement({
  tagname: 'input',
  options: [
    ['id', 'email'],
    ['className', 'form-control'],
    ['type', 'text'],
  ],
});
EMAIL_INPUT.setAttribute('aria-describedby', 'inputGroupPrepend');

const EMAIL_INVALID = createElement({
  tagname: 'div',
  options: [['className', 'invalid-feedback']],
});

const EMAIL_INPUT_GROUP = createElement({
  tagname: 'div',
  options: [['className', 'input-group has-validation']],
  childElements: [EMAIL_SYMBOL, EMAIL_INPUT, EMAIL_INVALID],
});

const EMAIL_FIELD = createElement({
  tagname: 'div',
  options: [['className', 'form-field']],
  childElements: [EMAIL_LABEL, EMAIL_INPUT_GROUP],
});

const PASSWORD_LABEL = createElement({
  tagname: 'label',
  options: [
    ['htmlFor', 'password'],
    ['className', 'form-label'],
    ['textContent', 'Password'],
  ],
});

const PASSWORD_INPUT = createElement({
  tagname: 'input',
  options: [
    ['id', 'password'],
    ['className', 'form-control'],
    ['type', 'password'],
  ],
});

const PASSWORD_INVALID = createElement({
  tagname: 'div',
  options: [['className', 'invalid-feedback']],
});

const PASSWORD_FIELD = createElement({
  tagname: 'div',
  options: [['className', 'form-field']],
  childElements: [PASSWORD_LABEL, PASSWORD_INPUT, PASSWORD_INVALID],
});

const BIRTH_DATE_LABEL = createElement({
  tagname: 'label',
  options: [
    ['htmlFor', 'birthDate'],
    ['className', 'form-label'],
    ['textContent', 'Birth date'],
  ],
});

const BIRTH_DATE_INPUT = createElement({
  tagname: 'input',
  options: [
    ['id', 'birthDate'],
    ['className', 'form-control'],
    ['type', 'date'],
  ],
});

const BIRTH_DATE_INVALID = createElement({
  tagname: 'div',
  options: [['className', 'invalid-feedback']],
});

const BIRTH_DATE_FIELD = createElement({
  tagname: 'div',
  options: [['className', 'form-field']],
  childElements: [BIRTH_DATE_LABEL, BIRTH_DATE_INPUT, BIRTH_DATE_INVALID],
});

const BILLING_COUNTRY_LABEL = createElement({
  tagname: 'label',
  options: [
    ['htmlFor', 'billingCountry'],
    ['className', 'form-label'],
    ['textContent', 'Country'],
  ],
});

const BILLING_COUNTRY_PRESELECTED_OPTION = createElement({
  tagname: 'option',
  options: [
    ['selected', true],
    ['disabled', true],
    ['value', ''],
    ['textContent', 'Country...'],
  ],
});

/**
 * TO DO : REPLACE ['insert_billingCountry']
 * WITH ARRAY OF COUNTRY NAMES
 */

const BILLING_COUNTRY_OPTIONS = ['insert billingCountry'].map((billingCountryName) =>
  createElement({
    tagname: 'option',
    options: [['textContent', billingCountryName]],
  })
);

const BILLING_COUNTRY_SELECT = createElement({
  tagname: 'select',
  options: [
    ['id', 'billingCountry'],
    ['className', 'form-control'],
  ],
  childElements: [BILLING_COUNTRY_PRESELECTED_OPTION, ...BILLING_COUNTRY_OPTIONS],
});

const BILLING_COUNTRY_INVALID = createElement({
  tagname: 'div',
  options: [['className', 'invalid-feedback']],
});

const BILLING_COUNTRY_FIELD = createElement({
  tagname: 'div',
  options: [['className', 'form-field']],
  childElements: [BILLING_COUNTRY_LABEL, BILLING_COUNTRY_SELECT, BILLING_COUNTRY_INVALID],
});

const BILLING_POSTAL_CODE_LABEL = createElement({
  tagname: 'label',
  options: [
    ['htmlFor', 'billingPostalCode'],
    ['className', 'form-label'],
    ['textContent', 'Postal code'],
  ],
});

const BILLING_POSTAL_CODE_INPUT = createElement({
  tagname: 'input',
  options: [
    ['id', 'billingPostalCode'],
    ['className', 'form-control'],
    ['type', 'text'],
  ],
});

const BILLING_POSTAL_CODE_INVALID = createElement({
  tagname: 'div',
  options: [['className', 'invalid-feedback']],
});

const BILLING_POSTAL_CODE_FIELD = createElement({
  tagname: 'div',
  options: [['className', 'form-field']],
  childElements: [BILLING_POSTAL_CODE_LABEL, BILLING_POSTAL_CODE_INPUT, BILLING_POSTAL_CODE_INVALID],
});

const BILLING_CITY_LABEL = createElement({
  tagname: 'label',
  options: [
    ['htmlFor', 'billingCity'],
    ['className', 'form-label'],
    ['textContent', 'City'],
  ],
});

const BILLING_CITY_INPUT = createElement({
  tagname: 'input',
  options: [
    ['id', 'billingCity'],
    ['className', 'form-control'],
    ['type', 'text'],
  ],
});

const BILLING_CITY_INVALID = createElement({
  tagname: 'div',
  options: [['className', 'invalid-feedback']],
});

const BILLING_CITY_FIELD = createElement({
  tagname: 'div',
  options: [['className', 'form-field']],
  childElements: [BILLING_CITY_LABEL, BILLING_CITY_INPUT, BILLING_CITY_INVALID],
});

const BILLING_STREET_LABEL = createElement({
  tagname: 'label',
  options: [
    ['htmlFor', 'billingStreet'],
    ['className', 'form-label'],
    ['textContent', 'Street'],
  ],
});

const BILLING_STREET_INPUT = createElement({
  tagname: 'input',
  options: [
    ['id', 'billingStreet'],
    ['className', 'form-control'],
    ['type', 'text'],
  ],
});

const BILLING_STREET_INVALID = createElement({
  tagname: 'div',
  options: [['className', 'invalid-feedback']],
});

const BILLING_STREET_FIELD = createElement({
  tagname: 'div',
  options: [['className', 'form-field']],
  childElements: [BILLING_STREET_LABEL, BILLING_STREET_INPUT, BILLING_STREET_INVALID],
});

const ADDRESS_SWITCH_CHECKBOX = createElement({
  tagname: 'input',
  options: [
    ['id', 'flexSwitchCheckChecked'],
    ['className', 'form-check-input'],
    ['type', 'checkbox'],
    ['checked', true],
    ['ariaExpanded', false],
  ],
});
[
  ['data-bs-toggle', 'collapse'],
  ['data-bs-target', '#collapseExample'],
  ['aria-controls', 'collapseExample'],
].forEach(([attr, value]) => ADDRESS_SWITCH_CHECKBOX.setAttribute(attr, value));

const ADDRESS_SWITCH_LABEL = createElement({
  tagname: 'label',
  options: [
    ['htmlFor', 'flexSwitchCheckChecked'],
    ['className', 'form-check-label'],
    ['textContent', 'Set shipping address as default to billing address'],
  ],
});

const ADDRESS_SWITCH = createElement({
  tagname: 'div',
  options: [['className', 'form-field form-check form-switch']],
  childElements: [ADDRESS_SWITCH_CHECKBOX, ADDRESS_SWITCH_LABEL],
});

const SHIPPING_COUNTRY_LABEL = createElement({
  tagname: 'label',
  options: [
    ['htmlFor', 'shippingCountry'],
    ['className', 'form-label'],
    ['textContent', 'Country'],
  ],
});

const SHIPPING_COUNTRY_PRESELECTED_OPTION = createElement({
  tagname: 'option',
  options: [
    ['selected', true],
    ['disabled', true],
    ['value', ''],
    ['textContent', 'Country...'],
  ],
});

/**
 * TO DO : REPLACE ['insert_shippingCountry']
 * WITH ARRAY OF COUNTRY NAMES
 */

const SHIPPING_COUNTRY_OPTIONS = ['insert shippingCountry'].map((shippingCountryName) =>
  createElement({
    tagname: 'option',
    options: [['textContent', shippingCountryName]],
  })
);

const SHIPPING_COUNTRY_SELECT = createElement({
  tagname: 'select',
  options: [
    ['id', 'shippingCountry'],
    ['className', 'form-control'],
  ],
  childElements: [SHIPPING_COUNTRY_PRESELECTED_OPTION, ...SHIPPING_COUNTRY_OPTIONS],
});

const SHIPPING_COUNTRY_INVALID = createElement({
  tagname: 'div',
  options: [['className', 'invalid-feedback']],
});

const SHIPPING_COUNTRY_FIELD = createElement({
  tagname: 'div',
  options: [['className', 'form-field']],
  childElements: [SHIPPING_COUNTRY_LABEL, SHIPPING_COUNTRY_SELECT, SHIPPING_COUNTRY_INVALID],
});

const SHIPPING_POSTAL_CODE_LABEL = createElement({
  tagname: 'label',
  options: [
    ['htmlFor', 'shippingPostalCode'],
    ['className', 'form-label'],
    ['textContent', 'Postal code'],
  ],
});

const SHIPPING_POSTAL_CODE_INPUT = createElement({
  tagname: 'input',
  options: [
    ['id', 'shippingPostalCode'],
    ['className', 'form-control'],
    ['type', 'text'],
  ],
});

const SHIPPING_POSTAL_CODE_INVALID = createElement({
  tagname: 'div',
  options: [['className', 'invalid-feedback']],
});

const SHIPPING_POSTAL_CODE_FIELD = createElement({
  tagname: 'div',
  options: [['className', 'form-field']],
  childElements: [SHIPPING_POSTAL_CODE_LABEL, SHIPPING_POSTAL_CODE_INPUT, SHIPPING_POSTAL_CODE_INVALID],
});

const SHIPPING_CITY_LABEL = createElement({
  tagname: 'label',
  options: [
    ['htmlFor', 'shippingCity'],
    ['className', 'form-label'],
    ['textContent', 'City'],
  ],
});

const SHIPPING_CITY_INPUT = createElement({
  tagname: 'input',
  options: [
    ['id', 'shippingCity'],
    ['className', 'form-control'],
    ['type', 'text'],
  ],
});

const SHIPPING_CITY_INVALID = createElement({
  tagname: 'div',
  options: [['className', 'invalid-feedback']],
});

const SHIPPING_CITY_FIELD = createElement({
  tagname: 'div',
  options: [['className', 'form-field']],
  childElements: [SHIPPING_CITY_LABEL, SHIPPING_CITY_INPUT, SHIPPING_CITY_INVALID],
});

const SHIPPING_STREET_LABEL = createElement({
  tagname: 'label',
  options: [
    ['htmlFor', 'shippingStreet'],
    ['className', 'form-label'],
    ['textContent', 'Street'],
  ],
});

const SHIPPING_STREET_INPUT = createElement({
  tagname: 'input',
  options: [
    ['id', 'shippingStreet'],
    ['className', 'form-control'],
    ['type', 'text'],
  ],
});

const SHIPPING_STREET_INVALID = createElement({
  tagname: 'div',
  options: [['className', 'invalid-feedback']],
});

const SHIPPING_STREET_FIELD = createElement({
  tagname: 'div',
  options: [['className', 'form-field']],
  childElements: [SHIPPING_STREET_LABEL, SHIPPING_STREET_INPUT, SHIPPING_STREET_INVALID],
});

const HIDDEN_AREA = createElement({
  tagname: 'div',
  options: [
    ['className', 'collapse'],
    ['id', 'collapseExample'],
  ],
  childElements: [
    ADDRESS_HEADER_SHIPPING,
    SHIPPING_COUNTRY_FIELD,
    SHIPPING_POSTAL_CODE_FIELD,
    SHIPPING_CITY_FIELD,
    SHIPPING_STREET_FIELD,
  ],
});

const REGISTER_BUTTON = createElement({
  tagname: 'input',
  options: [
    ['className', 'submit-button'],
    ['type', 'submit'],
    ['textContent', 'Register'],
  ],
});

const FORM = createElement({
  tagname: 'form',
  options: [
    ['className', 'registration-form needs-validation was-validated'],
    ['noValidate', true],
  ],
  childElements: [
    REGISTRATION_HEADER,
    NAME_FIELD,
    LAST_NAME_FIELD,
    EMAIL_FIELD,
    PASSWORD_FIELD,
    BIRTH_DATE_FIELD,
    ADDRESS_HEADER_BILLING,
    BILLING_COUNTRY_FIELD,
    BILLING_POSTAL_CODE_FIELD,
    BILLING_CITY_FIELD,
    BILLING_STREET_FIELD,
    ADDRESS_SWITCH,
    HIDDEN_AREA,
    REGISTER_BUTTON,
  ],
});

document.body.append(FORM);

// Fetch all the forms we want to apply custom Bootstrap validation styles to
// const form = document.querySelector('.needs-validation') as HTMLFormElement;
// const input = form.querySelector('#validationCustom01') as HTMLInputElement;
// input.onchange = function s() {
//   input.setCustomValidity('asdsa');
//   //   form.classList.add('was-validated');
// };
// // Loop over them and prevent submission

// form.addEventListener(
//   'submit',
//   (event) => {
//     event.preventDefault();
//     input.setCustomValidity('');
//     form.classList.add('was-validated');
//   },
//   false
// );
