// import { string } from 'yup';
import loginValidationResults from '../../shared/helpers/data';
import { createElement } from '../../shared/helpers/dom-utilites';
// import { LoginValidation } from '../../shared/types/types';
import { loginValidation, passwordValidation } from './login-validation';
// import './login.scss';

export default function createLoginPage() {
  const LABEL_EMAIL = createElement({
    tagname: 'label',
    options: [
      ['className', 'form-label'],
      ['htmlFor', 'InputEmail'],
      ['textContent', 'Email address'],
    ],
  });
  const INPUT_EMAIL = createElement({
    tagname: 'input',
    options: [
      ['className', 'form-control'],
      ['type', 'email'],
      ['id', 'InputEmail'],
    ],
  });
  const HELP_EMAIL = createElement({
    tagname: 'div',
    options: [
      ['className', 'form-text'],
      ['id', 'emailHelp'],
    ],
  });
  const CONTAINER_EMAIL = createElement({
    tagname: 'div',
    childElements: [LABEL_EMAIL, INPUT_EMAIL, HELP_EMAIL],
    options: [['className', 'mb-3']],
  });

  const LABEL_PASSWD = createElement({
    tagname: 'label',
    options: [
      ['className', 'form-label'],
      ['htmlFor', 'InputPassword'],
      ['textContent', 'Password'],
    ],
  });
  const INPUT_PASSWD = createElement({
    tagname: 'input',
    options: [
      ['className', 'form-control'],
      ['type', 'password'],
      ['id', 'InputPassword'],
    ],
  });
  const HELP_PASSWD = createElement({
    tagname: 'div',
    options: [
      ['className', 'form-text'],
      ['id', 'passwdHelp'],
    ],
  });
  const CONTAINER_PASSWD = createElement({
    tagname: 'div',
    childElements: [LABEL_PASSWD, INPUT_PASSWD, HELP_PASSWD],
    options: [['className', 'mb-3']],
  });

  const INPUT_CHECK = createElement({
    tagname: 'input',
    options: [
      ['className', 'form-check-input'],
      ['type', 'checkbox'],
      ['id', 'exampleCheck1'],
    ],
  });
  const LABEL_CHECK = createElement({
    tagname: 'label',
    options: [
      ['className', 'form-check-label'],
      ['htmlFor', 'exampleCheck1'],
      ['textContent', 'Show password'],
    ],
  });
  const CONTAINER_CHECK = createElement({
    tagname: 'div',
    childElements: [INPUT_CHECK, LABEL_CHECK],
    options: [['className', 'mb-3 form-check']],
  });

  const BUTTON = createElement({
    tagname: 'button',
    options: [
      ['className', 'btn btn-primary'],
      ['type', 'submit'],
      ['textContent', 'Submit'],
    ],
  });

  const FORM = createElement({
    tagname: 'form',
    childElements: [CONTAINER_EMAIL, CONTAINER_PASSWD, CONTAINER_CHECK, BUTTON],
  });

  INPUT_EMAIL.setAttribute('aria-describedby', 'emailHelp');
  BUTTON.setAttribute('disabled', '');

  // Показать/скрыть пароль
  INPUT_CHECK.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      INPUT_PASSWD.setAttribute('type', 'text');
    } else {
      INPUT_PASSWD.setAttribute('type', 'password');
    }
  });

  // Поле краснеет при первом фокусе на него
  INPUT_EMAIL.addEventListener(
    'focus',
    (event: FocusEvent) => {
      const target = event.target as HTMLInputElement;
      target.classList.add('form-control_validation');
    },
    { once: true }
  );

  INPUT_PASSWD.addEventListener(
    'focus',
    (event: FocusEvent) => {
      const target = event.target as HTMLInputElement;
      target.classList.add('form-control_validation');
    },
    { once: true }
  );

  FORM.addEventListener('keyup', (event: KeyboardEvent) => {
    const target = event.target as HTMLInputElement;
    if (target.tagName !== 'INPUT') return;

    const text = target.value;

    if (target.id === 'InputEmail') {
      const validation = loginValidation({ login: text });

      if (typeof validation === 'string') {
        HELP_EMAIL.innerText = validation;
        target.classList.add('form-control_validation');
        loginValidationResults.login = false;
      } else {
        target.classList.remove('form-control_validation');
        HELP_EMAIL.innerText = '';
        loginValidationResults.login = true;
      }
    }

    if (target.id === 'InputPassword') {
      const validation = passwordValidation({ password: text });

      if (typeof validation === 'string') {
        HELP_PASSWD.innerText = validation;
        target.classList.add('form-control_validation');
        loginValidationResults.password = false;
      } else {
        target.classList.remove('form-control_validation');
        HELP_PASSWD.innerText = '';
        loginValidationResults.password = true;
      }
    }
  });

  return FORM;
}

/* function checkValidationResultsObject(obj: LoginValidation) {
  if (obj.login && obj.password) {

  }
} */
