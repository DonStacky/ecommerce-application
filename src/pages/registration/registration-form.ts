import 'bootstrap';
import { date, string } from 'yup';
import { createElement } from '../../shared/helpers/dom-utilites';
import submit from './customer-registration';
import { MIN_AGE_MILISEC, validateDate, validatePostalCode, validateString } from './form-validation';
import countries from './postal-codes';

const LINK_TO_LOGIN = createElement({
  tagname: 'a',
  options: [
    ['textContent', 'Login'],
    ['href', `/login`],
    ['className', 'link-login'],
  ],
});
LINK_TO_LOGIN.dataset.navigo = 'true';

const REDIRECT_TO_LOGIN = createElement({
  tagname: 'span',
  options: [
    ['textContent', 'Already have an account? '],
    ['className', 'form-field form-label'],
  ],
  childElements: [LINK_TO_LOGIN],
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
    ['autocomplete', true],
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
});

const BILLING_COUNTRY_FIELD = createElement({
  tagname: 'div',
  options: [['className', 'form-field']],
  childElements: [ADDRESS_HEADER_BILLING, BILLING_COUNTRY_LABEL, BILLING_COUNTRY_SELECT, BILLING_COUNTRY_INVALID],
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
});

const BILLING_STREET_FIELD = createElement({
  tagname: 'div',
  options: [['className', 'form-field']],
  childElements: [BILLING_STREET_LABEL, BILLING_STREET_INPUT, BILLING_STREET_INVALID],
});

const BILLING_SET_DEFAULT = createElement({
  tagname: 'input',
  options: [
    ['className', 'form-check-input'],
    ['id', 'billingDefault'],
    ['type', 'checkbox'],
  ],
});

const BILLING_DEFAULT_OPTIONS = createElement({
  tagname: 'div',
  options: [['className', 'form-field form-check form-switch']],
  childElements: [
    BILLING_SET_DEFAULT,

    createElement({
      tagname: 'label',
      options: [
        ['className', 'form-check-label'],
        ['htmlFor', 'billingDefault'],
        ['textContent', 'Set as default'],
      ],
    }),
  ],
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
});

const SHIPPING_STREET_FIELD = createElement({
  tagname: 'div',
  options: [['className', 'form-field']],
  childElements: [SHIPPING_STREET_LABEL, SHIPPING_STREET_INPUT, SHIPPING_STREET_INVALID],
});

const SHIPPING_SET_DEFAULT = createElement({
  tagname: 'input',
  options: [
    ['className', 'form-check-input'],
    ['id', 'shippingDefault'],
    ['type', 'checkbox'],
  ],
});

const SHIPPING_DEFAULT_OPTIONS = createElement({
  tagname: 'div',
  options: [['className', 'form-field form-check form-switch']],
  childElements: [
    SHIPPING_SET_DEFAULT,

    createElement({
      tagname: 'label',
      options: [
        ['className', 'form-check-label'],
        ['htmlFor', 'shippingDefault'],
        ['textContent', 'Set as default'],
      ],
    }),
  ],
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
    SHIPPING_DEFAULT_OPTIONS,
  ],
});

const REGISTER_BUTTON = createElement({
  tagname: 'button',
  options: [
    ['className', 'submit-button m-3'],
    ['type', 'submit'],
    ['textContent', 'Register'],
  ],
});

const VALIDATIONS = [
  validateString(
    NAME_INVALID,
    string()
      .required('Please enter your first name. First name field is required')
      .matches(
        /^([a-zA-Zа-яА-Я]+ )*[a-zA-Zа-яА-Я]+$/,
        'First name should not contain any special symbols or numbers. First name must not contain leading or trailing whitespace'
      )
  ).bind(NAME_INPUT),

  validateString(
    LAST_NAME_INVALID,
    string()
      .required('Please enter your last name. Last name field is required')
      .matches(
        /^([a-zA-Zа-яА-Я]+ )*[a-zA-Zа-яА-Я]+$/,
        'Last name should not contain any special symbols or numbers. Last name must not contain leading or trailing whitespace'
      )
  ).bind(LAST_NAME_INPUT),

  validateString(
    EMAIL_INVALID,
    string()
      .required('Email addres is required')
      .matches(/^\S+$/, 'Email address must not contain leading or trailing whitespace')
      .matches(
        /^[-a-z0-9A-Z!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9A-Z!#$%&'*+/=?^_`{|}~]+)*/,
        'Email address must contain correct username'
      )
      .matches(/@/, 'Email address must contain an "@" symbol separating local part and domain name')
      .matches(
        /@([a-z0-9]([a-z0-9]{0,61}[-a-z0-9])?\.)(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/,
        'Email address must contain a domain name (e.g., example.com)'
      )
      .email('Email address must be properly formatted (e.g., user@example.com)')
  ).bind(EMAIL_INPUT),

  validateString(
    PASSWORD_INVALID,
    string()
      .required('Password is required')
      .min(8, 'Password too short')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter (A-Z)')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter (a-z)')
      .matches(/[0-9]/, 'Password must contain at least one digit (0-9)')
      .matches(/[\W_]/, 'Password must contain at least one special character (e.g., !@#$%^&*-)')
      .matches(/^\S+\S+$/, 'Password must not contain leading or trailing whitespace')
  ).bind(PASSWORD_INPUT),

  validateDate(
    BIRTH_DATE_INVALID,
    date().max(new Date(Date.now() - MIN_AGE_MILISEC), 'You must be older than 13 y.o.')
  ).bind(BIRTH_DATE_INPUT),

  validateString(
    BILLING_COUNTRY_INVALID,
    string().required('Please enter your country. Country field is required')
  ).bind(BILLING_COUNTRY_SELECT),

  validatePostalCode(BILLING_COUNTRY_SELECT, BILLING_POSTAL_CODE_INVALID).bind(BILLING_POSTAL_CODE_INPUT),

  validateString(
    BILLING_CITY_INVALID,
    string()
      .min(1, 'City field should contain at least 1 character')
      .matches(
        /^([a-zA-Zа-яА-Я]+ )*[a-zA-Zа-яА-Я]+$/,
        'City field should not contain any special symbols or numbers. City should not contain leading or trailing whitespace'
      )
  ).bind(BILLING_CITY_INPUT),

  validateString(BILLING_STREET_INVALID, string().min(1, 'Street field should contain at least 1 character')).bind(
    BILLING_STREET_INPUT
  ),
];

const VALIDATIONS_EXTENDED = [
  validateString(
    SHIPPING_COUNTRY_INVALID,
    string().required('Please enter your country. Country field is required')
  ).bind(SHIPPING_COUNTRY_SELECT),

  validatePostalCode(SHIPPING_COUNTRY_SELECT, SHIPPING_POSTAL_CODE_INVALID).bind(SHIPPING_POSTAL_CODE_INPUT),

  validateString(
    SHIPPING_CITY_INVALID,
    string()
      .min(1, 'City field should contain at least 1 character')
      .matches(
        /^([a-zA-Zа-яА-Я]+ )*[a-zA-Zа-яА-Я]+$/,
        'City field should not contain any special symbols or numbers. City should not contain leading or trailing whitespace'
      )
  ).bind(SHIPPING_CITY_INPUT),

  validateString(SHIPPING_STREET_INVALID, string().min(1, 'Street field should contain at least 1 character')).bind(
    SHIPPING_STREET_INPUT
  ),
];

// Set aria-describedby for input values

const inputs = [
  NAME_INPUT,
  LAST_NAME_INPUT,
  EMAIL_INPUT,
  PASSWORD_INPUT,
  BIRTH_DATE_INPUT,
  BILLING_COUNTRY_SELECT,
  BILLING_POSTAL_CODE_INPUT,
  BILLING_CITY_INPUT,
  BILLING_STREET_INPUT,
  SHIPPING_COUNTRY_SELECT,
  SHIPPING_POSTAL_CODE_INPUT,
  SHIPPING_CITY_INPUT,
  SHIPPING_STREET_INPUT,
];

const validationMessages = [
  NAME_INVALID,
  LAST_NAME_INVALID,
  EMAIL_INVALID,
  PASSWORD_INVALID,
  BIRTH_DATE_INVALID,
  BILLING_COUNTRY_INVALID,
  BILLING_POSTAL_CODE_INVALID,
  BILLING_CITY_INVALID,
  BILLING_STREET_INVALID,
  SHIPPING_COUNTRY_INVALID,
  SHIPPING_POSTAL_CODE_INVALID,
  SHIPPING_CITY_INVALID,
  SHIPPING_STREET_INVALID,
];

inputs.forEach((input, idx) => {
  input.setAttribute('aria-describedby', `${validationMessages[idx].id}`);
  input.addEventListener('input', [...VALIDATIONS, ...VALIDATIONS_EXTENDED][idx]);
});

const CUSTOMER_TEMPLATE = {
  isCommonAddress: ADDRESS_SWITCH_CHECKBOX,
  isBillingDefault: BILLING_SET_DEFAULT,
  isShippingDefault: SHIPPING_SET_DEFAULT,
  firstName: NAME_INPUT,
  lastName: LAST_NAME_INPUT,
  email: EMAIL_INPUT,
  password: PASSWORD_INPUT,
  birthDate: BIRTH_DATE_INPUT,
  billingAddress: {
    country: BILLING_COUNTRY_SELECT,
    city: BILLING_CITY_INPUT,
    streetName: BILLING_STREET_INPUT,
    postalCode: BILLING_POSTAL_CODE_INPUT,
  },
  shippingAddress: {
    country: SHIPPING_COUNTRY_SELECT,
    city: SHIPPING_CITY_INPUT,
    streetName: SHIPPING_STREET_INPUT,
    postalCode: SHIPPING_POSTAL_CODE_INPUT,
  },
};

export default createElement({
  tagname: 'form',
  options: [
    [
      'className',
      'registration-form form-style needs-validation container-xl me-auto ms-auto col-10 col-sm-8 col-md-6',
    ],
    ['noValidate', true],
  ],
  childElements: [
    REDIRECT_TO_LOGIN,
    NAME_FIELD,
    LAST_NAME_FIELD,
    EMAIL_FIELD,
    PASSWORD_FIELD,
    BIRTH_DATE_FIELD,
    BILLING_COUNTRY_FIELD,
    BILLING_POSTAL_CODE_FIELD,
    BILLING_CITY_FIELD,
    BILLING_STREET_FIELD,
    BILLING_DEFAULT_OPTIONS,
    ADDRESS_SWITCH,
    HIDDEN_AREA,
    REGISTER_BUTTON,
  ],
  events: [['submit', submit(VALIDATIONS, VALIDATIONS_EXTENDED, ADDRESS_SWITCH_CHECKBOX, CUSTOMER_TEMPLATE)]],
});
