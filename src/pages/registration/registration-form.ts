import { createElement } from '../../shared/helpers/dom-utilites';
import 'bootstrap';
import { MIN_AGE_MILISEC, submit, validateDate, validatePostalCode, validateString } from './form-validation';
import { date, string } from 'yup';
import countries from './postal-codes';

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

const NAME_INVALID = createElement({
  tagname: 'div',
  options: [
    ['className', 'invalid-feedback'],
    ['id', 'name-validation'],
  ],
});

const NAME_INPUT = createElement({
  tagname: 'input',
  options: [
    ['id', 'firstName'],
    ['className', 'form-control'],
    ['type', 'text'],
  ],
  events: [
    [
      'change',
      validateString(
        NAME_INVALID,
        string()
          .required()
          .matches(/^[a-zA-Z]+$/, 'this should not contain any special symbols or numbers')
      ),
    ],
  ],
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

const LAST_NAME_INVALID = createElement({
  tagname: 'div',
  options: [
    ['className', 'invalid-feedback'],
    ['id', 'last-name-validation'],
  ],
});

const LAST_NAME_INPUT = createElement({
  tagname: 'input',
  options: [
    ['id', 'lastName'],
    ['className', 'form-control'],
    ['type', 'text'],
  ],
  events: [
    [
      'change',
      validateString(
        LAST_NAME_INVALID,
        string()
          .required()
          .matches(/^[a-zA-Z]+$/, 'this should not contain any special symbols or numbers')
      ),
    ],
  ],
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

const EMAIL_INVALID = createElement({
  tagname: 'div',
  options: [
    ['className', 'invalid-feedback'],
    ['id', 'email-validation'],
  ],
});

const EMAIL_INPUT = createElement({
  tagname: 'input',
  options: [
    ['id', 'email'],
    ['className', 'form-control'],
    ['type', 'text'],
  ],
  events: [['change', validateString(EMAIL_INVALID, string().required().email())]],
});
EMAIL_INPUT.setAttribute('aria-describedby', 'inputGroupPrepend');

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

const PASSWORD_INVALID = createElement({
  tagname: 'div',
  options: [
    ['className', 'invalid-feedback'],
    ['id', 'password-validation'],
  ],
});

const PASSWORD_INPUT = createElement({
  tagname: 'input',
  options: [
    ['id', 'password'],
    ['className', 'form-control'],
    ['type', 'password'],
  ],
  events: [
    [
      'change',
      validateString(
        PASSWORD_INVALID,
        string()
          .required()
          .min(8, 'this should contain at least 8 characters')
          .matches(/^.*[a-z]+.*$/, 'this should contain at least 1 lowercase letter')
          .matches(/^.*[A-Z]+.*$/, 'this should contain at least 1 uppercase letter')
          .matches(/^.*[\d]+.*$/, 'this should contain at least 1 digit')
      ),
    ],
  ],
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

const BIRTH_DATE_INVALID = createElement({
  tagname: 'div',
  options: [
    ['className', 'invalid-feedback'],
    ['id', 'birth-date-validation'],
  ],
});

const BIRTH_DATE_INPUT = createElement({
  tagname: 'input',
  options: [
    ['id', 'birthDate'],
    ['className', 'form-control'],
    ['type', 'date'],
  ],
  events: [
    [
      'change',
      validateDate(
        BIRTH_DATE_INVALID,
        date()
          .required()
          .max(new Date(Date.now() - MIN_AGE_MILISEC), 'You must be older than 13 y.o.')
      ),
    ],
    [
      'blur',
      validateDate(
        BIRTH_DATE_INVALID,
        date()
          .required()
          .max(new Date(Date.now() - MIN_AGE_MILISEC), 'You must be older than 13 y.o.')
      ),
    ],
  ],
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

const BILLING_COUNTRY_OPTIONS = countries.map(({ Country }) =>
  createElement({
    tagname: 'option',
    options: [['textContent', Country]],
  })
);

const BILLING_COUNTRY_INVALID = createElement({
  tagname: 'div',
  options: [
    ['className', 'invalid-feedback'],
    ['id', 'billing-country-validation'],
  ],
});

const BILLING_COUNTRY_SELECT = createElement({
  tagname: 'select',
  options: [
    ['id', 'billingCountry'],
    ['className', 'form-control'],
  ],
  childElements: [BILLING_COUNTRY_PRESELECTED_OPTION, ...BILLING_COUNTRY_OPTIONS],
  events: [['blur', validateString(BILLING_COUNTRY_INVALID, string().required())]],
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

const BILLING_POSTAL_CODE_INVALID = createElement({
  tagname: 'div',
  options: [
    ['className', 'invalid-feedback'],
    ['id', 'billing-postal-code-validation'],
  ],
});

const BILLING_POSTAL_CODE_INPUT = createElement({
  tagname: 'input',
  options: [
    ['id', 'billingPostalCode'],
    ['className', 'form-control'],
    ['type', 'text'],
  ],
  events: [['change', validatePostalCode(BILLING_COUNTRY_SELECT, BILLING_POSTAL_CODE_INVALID)]],
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

const BILLING_CITY_INVALID = createElement({
  tagname: 'div',
  options: [
    ['className', 'invalid-feedback'],
    ['id', 'billing-city-validation'],
  ],
});

const BILLING_CITY_INPUT = createElement({
  tagname: 'input',
  options: [
    ['id', 'billingCity'],
    ['className', 'form-control'],
    ['type', 'text'],
  ],
  events: [
    [
      'change',
      validateString(
        BILLING_CITY_INVALID,
        string()
          .min(1, 'this should contain at least 1 character')
          .matches(/^[a-zA-Z]+$/, 'this should not contain any special symbols or numbers')
      ),
    ],
  ],
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

const BILLING_STREET_INVALID = createElement({
  tagname: 'div',
  options: [
    ['className', 'invalid-feedback'],
    ['id', 'billing-street-validation'],
  ],
});

const BILLING_STREET_INPUT = createElement({
  tagname: 'input',
  options: [
    ['id', 'billingStreet'],
    ['className', 'form-control'],
    ['type', 'text'],
  ],
  events: [
    ['change', validateString(BILLING_STREET_INVALID, string().min(1, 'this should contain at least 1 character'))],
  ],
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

const SHIPPING_COUNTRY_OPTIONS = countries.map(({ Country }) =>
  createElement({
    tagname: 'option',
    options: [['textContent', Country]],
  })
);

const SHIPPING_COUNTRY_INVALID = createElement({
  tagname: 'div',
  options: [
    ['className', 'invalid-feedback'],
    ['id', 'country-select-validation'],
  ],
});

const SHIPPING_COUNTRY_SELECT = createElement({
  tagname: 'select',
  options: [
    ['id', 'shippingCountry'],
    ['className', 'form-control'],
  ],
  childElements: [SHIPPING_COUNTRY_PRESELECTED_OPTION, ...SHIPPING_COUNTRY_OPTIONS],
  events: [['blur', validateString(SHIPPING_COUNTRY_INVALID, string().required())]],
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

const SHIPPING_POSTAL_CODE_INVALID = createElement({
  tagname: 'div',
  options: [
    ['className', 'invalid-feedback'],
    ['id', 'shipping-postal-code-validation'],
  ],
});

const SHIPPING_POSTAL_CODE_INPUT = createElement({
  tagname: 'input',
  options: [
    ['id', 'shippingPostalCode'],
    ['className', 'form-control'],
    ['type', 'text'],
  ],
  events: [['change', validatePostalCode(SHIPPING_COUNTRY_SELECT, SHIPPING_POSTAL_CODE_INVALID)]],
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

const SHIPPING_CITY_INVALID = createElement({
  tagname: 'div',
  options: [
    ['className', 'invalid-feedback'],
    ['id', 'shipping-city-validation'],
  ],
});

const SHIPPING_CITY_INPUT = createElement({
  tagname: 'input',
  options: [
    ['id', 'shippingCity'],
    ['className', 'form-control'],
    ['type', 'text'],
  ],
  events: [
    [
      'change',
      validateString(
        SHIPPING_CITY_INVALID,
        string()
          .min(1, 'this should contain at least 1 character')
          .matches(/^[a-zA-Z]+$/, 'this should not contain any special symbols or numbers')
      ),
    ],
  ],
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

const SHIPPING_STREET_INVALID = createElement({
  tagname: 'div',
  options: [
    ['className', 'invalid-feedback'],
    ['id', 'shipping-street-validation'],
  ],
});

const SHIPPING_STREET_INPUT = createElement({
  tagname: 'input',
  options: [
    ['id', 'shippingStreet'],
    ['className', 'form-control'],
    ['type', 'text'],
  ],
  events: [
    ['change', validateString(SHIPPING_STREET_INVALID, string().min(1, 'this should contain at least 1 character'))],
  ],
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

const VALIDATIONS_TO_CHECK = [
  validateString(
    NAME_INVALID,
    string()
      .required()
      .matches(/^[a-zA-Z]+$/, 'this should not contain any special symbols or numbers')
  ).bind(NAME_INPUT),

  validateString(
    LAST_NAME_INVALID,
    string()
      .required()
      .matches(/^[a-zA-Z]+$/, 'this should not contain any special symbols or numbers')
  ).bind(LAST_NAME_INPUT),

  validateString(EMAIL_INVALID, string().required().email()).bind(EMAIL_INPUT),

  validateString(
    PASSWORD_INVALID,
    string()
      .required()
      .min(8, 'this should contain at least 8 characters')
      .matches(/^.*[a-z]+.*$/, 'this should contain at least 1 lowercase letter')
      .matches(/^.*[A-Z]+.*$/, 'this should contain at least 1 uppercase letter')
      .matches(/^.*[\d]+.*$/, 'this should contain at least 1 digit')
  ).bind(PASSWORD_INPUT),

  validateDate(
    BIRTH_DATE_INVALID,
    date()
      .required()
      .max(new Date(Date.now() - MIN_AGE_MILISEC), 'You must be older than 13 y.o.')
  ).bind(BIRTH_DATE_INPUT),

  validateString(BILLING_COUNTRY_INVALID, string().required()).bind(BILLING_COUNTRY_SELECT),

  validatePostalCode(BILLING_COUNTRY_SELECT, BILLING_POSTAL_CODE_INVALID).bind(BILLING_POSTAL_CODE_INPUT),

  validateString(
    BILLING_CITY_INVALID,
    string()
      .min(1, 'this should contain at least 1 character')
      .matches(/^[a-zA-Z]+$/, 'this should not contain any special symbols or numbers')
  ).bind(BILLING_CITY_INPUT),

  validateString(BILLING_STREET_INVALID, string().min(1, 'this should contain at least 1 character')).bind(
    BILLING_STREET_INPUT
  ),
];

const EXTENDED_LIST = [
  validateString(SHIPPING_COUNTRY_INVALID, string().required()).bind(SHIPPING_COUNTRY_SELECT),

  validatePostalCode(SHIPPING_COUNTRY_SELECT, SHIPPING_POSTAL_CODE_INVALID).bind(SHIPPING_POSTAL_CODE_INPUT),

  validateString(
    SHIPPING_CITY_INVALID,
    string()
      .min(1, 'this should contain at least 1 character')
      .matches(/^[a-zA-Z]+$/, 'this should not contain any special symbols or numbers')
  ).bind(SHIPPING_CITY_INPUT),

  validateString(SHIPPING_STREET_INVALID, string().min(1, 'this should contain at least 1 character')).bind(
    SHIPPING_STREET_INPUT
  ),
];

export default createElement({
  tagname: 'form',
  options: [
    ['className', 'registration-form needs-validation'],
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
  events: [['submit', submit(VALIDATIONS_TO_CHECK, EXTENDED_LIST, ADDRESS_SWITCH_CHECKBOX)]],
});

// Set aria-describedby for input values

const inputs = [
  NAME_INPUT,
  LAST_NAME_INPUT,
  EMAIL_INPUT,
  BIRTH_DATE_INPUT,
  PASSWORD_INPUT,
  SHIPPING_COUNTRY_SELECT,
  SHIPPING_POSTAL_CODE_INPUT,
  SHIPPING_CITY_INPUT,
  SHIPPING_STREET_INPUT,
  BILLING_COUNTRY_SELECT,
  BILLING_POSTAL_CODE_INPUT,
  BILLING_CITY_INPUT,
  BILLING_STREET_INPUT,
];

const validationMessages = [
  NAME_INVALID,
  LAST_NAME_INVALID,
  EMAIL_INVALID,
  BIRTH_DATE_INVALID,
  PASSWORD_INVALID,
  SHIPPING_COUNTRY_INVALID,
  SHIPPING_POSTAL_CODE_INVALID,
  SHIPPING_CITY_INVALID,
  SHIPPING_STREET_INVALID,
  BILLING_COUNTRY_INVALID,
  BILLING_POSTAL_CODE_INVALID,
  BILLING_CITY_INVALID,
  BILLING_STREET_INVALID,
];

inputs.forEach((input, idx) => input.setAttribute('aria-describedby', `${validationMessages[idx].id}`));
