import { ErrorObject } from '@commercetools/platform-sdk';
import { StatusCodes } from 'http-status-codes';
// import ROUTER from '../../app/router/router_new';
import loginCustomer from '../../shared/api/login-customer';
import { createElement } from '../../shared/helpers/dom-utilites';
import loginValidationResults from './data';
import { loginValidation, passwordValidation } from './login-validation';
import { LoginValidation } from './types';

class LoginForm {
  LABEL_EMAIL: HTMLLabelElement;

  INPUT_EMAIL: HTMLInputElement;

  HELP_EMAIL: HTMLDivElement;

  CONTAINER_EMAIL: HTMLDivElement;

  LABEL_PASSWD: HTMLLabelElement;

  INPUT_PASSWD: HTMLInputElement;

  HELP_PASSWD: HTMLDivElement;

  CONTAINER_PASSWD: HTMLDivElement;

  INPUT_CHECK: HTMLInputElement;

  LABEL_CHECK: HTMLLabelElement;

  CONTAINER_CHECK: HTMLDivElement;

  BUTTON: HTMLButtonElement;

  FORM: HTMLFormElement;

  constructor() {
    this.LABEL_EMAIL = createElement({
      tagname: 'label',
      options: [
        ['className', 'form-label'],
        ['htmlFor', 'InputEmail'],
        ['textContent', 'Email address'],
      ],
    });
    this.INPUT_EMAIL = createElement({
      tagname: 'input',
      options: [
        ['className', 'form-control'],
        ['type', 'email'],
        ['id', 'InputEmail'],
      ],
    });
    this.HELP_EMAIL = createElement({
      tagname: 'div',
      options: [
        ['className', 'form-text'],
        ['id', 'emailHelp'],
      ],
    });
    this.CONTAINER_EMAIL = createElement({
      tagname: 'div',
      childElements: [this.LABEL_EMAIL, this.INPUT_EMAIL, this.HELP_EMAIL],
      options: [['className', '']],
    });

    this.LABEL_PASSWD = createElement({
      tagname: 'label',
      options: [
        ['className', 'form-label'],
        ['htmlFor', 'InputPassword'],
        ['textContent', 'Password'],
      ],
    });
    this.INPUT_PASSWD = createElement({
      tagname: 'input',
      options: [
        ['className', 'form-control'],
        ['type', 'password'],
        ['id', 'InputPassword'],
      ],
    });
    this.HELP_PASSWD = createElement({
      tagname: 'div',
      options: [
        ['className', 'form-text'],
        ['id', 'passwdHelp'],
      ],
    });
    this.CONTAINER_PASSWD = createElement({
      tagname: 'div',
      childElements: [this.LABEL_PASSWD, this.INPUT_PASSWD, this.HELP_PASSWD],
      options: [['className', '']],
    });

    this.INPUT_CHECK = createElement({
      tagname: 'input',
      options: [
        ['className', 'form-check-input'],
        ['type', 'checkbox'],
        ['id', 'exampleCheck1'],
      ],
    });
    this.LABEL_CHECK = createElement({
      tagname: 'label',
      options: [
        ['className', 'form-check-label'],
        ['htmlFor', 'exampleCheck1'],
        ['textContent', 'Show password'],
      ],
    });
    this.CONTAINER_CHECK = createElement({
      tagname: 'div',
      childElements: [this.INPUT_CHECK, this.LABEL_CHECK],
      options: [['className', 'mb-3 form-check']],
    });

    this.BUTTON = createElement({
      tagname: 'button',
      options: [
        ['className', 'btn btn-light login-btn'],
        ['type', 'submit'],
        ['textContent', 'Submit'],
      ],
    });

    this.FORM = createElement({
      tagname: 'form',
      childElements: [this.CONTAINER_EMAIL, this.CONTAINER_PASSWD, this.CONTAINER_CHECK, this.BUTTON],
      options: [['className', 'login-form form-style']],
    });

    this.INPUT_EMAIL.setAttribute('aria-describedby', 'emailHelp');
    this.BUTTON.setAttribute('disabled', '');
    this.addEvents();
  }

  private addEvents() {
    // Показать/скрыть пароль
    this.INPUT_CHECK.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLInputElement;

      if (target.checked) {
        this.INPUT_PASSWD.setAttribute('type', 'text');
      } else {
        this.INPUT_PASSWD.setAttribute('type', 'password');
      }
    });

    // Поле краснеет при первом фокусе на него
    this.INPUT_EMAIL.addEventListener(
      'focus',
      (event: FocusEvent) => {
        const target = event.target as HTMLInputElement;
        target.classList.add('form-control_validation');
      },
      { once: true }
    );

    this.INPUT_PASSWD.addEventListener(
      'focus',
      (event: FocusEvent) => {
        const target = event.target as HTMLInputElement;
        target.classList.add('form-control_validation');
      },
      { once: true }
    );

    this.FORM.addEventListener('keyup', this.liveValidation.bind(this));
    this.BUTTON.addEventListener('click', this.submit.bind(this));
  }

  private liveValidation(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    if (target.tagName !== 'INPUT') return;

    const text = target.value;

    if (this.HELP_PASSWD.innerText === 'Wrong email or password') {
      this.HELP_PASSWD.innerText = '';
      this.INPUT_EMAIL.classList.remove('form-control_validation');
      this.INPUT_PASSWD.classList.remove('form-control_validation');
    }

    if (target.id === 'InputEmail') {
      const validation = loginValidation({ login: text });

      if (typeof validation === 'string') {
        this.HELP_EMAIL.innerText = validation;
        target.classList.add('form-control_validation');
        loginValidationResults.login = false;
      } else {
        target.classList.remove('form-control_validation');
        this.HELP_EMAIL.innerText = '';
        loginValidationResults.login = true;
      }
    }

    if (target.id === 'InputPassword') {
      const validation = passwordValidation({ password: text });

      if (typeof validation === 'string') {
        this.HELP_PASSWD.innerText = validation;
        target.classList.add('form-control_validation');
        loginValidationResults.password = false;
      } else {
        target.classList.remove('form-control_validation');
        this.HELP_PASSWD.innerText = '';
        loginValidationResults.password = true;
      }
    }

    this.createBtnStatus(loginValidationResults);
  }

  private createBtnStatus(validationData: LoginValidation) {
    if (validationData.login && validationData.password) {
      this.BUTTON.removeAttribute('disabled');
    } else {
      this.BUTTON.setAttribute('disabled', '');
    }
  }

  private submit(event: MouseEvent) {
    const target = event.target as HTMLButtonElement;
    if (target.tagName !== 'BUTTON') return;
    event.preventDefault();

    loginCustomer(this.INPUT_EMAIL.value, this.INPUT_PASSWD.value)
      .then(() => {
        this.HELP_PASSWD.innerText = '';
        this.INPUT_EMAIL.value = '';
        this.INPUT_PASSWD.value = '';
        // ROUTER.navigate('');
      })
      .catch((err: ErrorObject) => {
        if (err.body?.statusCode === StatusCodes.BAD_REQUEST) {
          this.HELP_PASSWD.innerText = 'Wrong email or password';
          this.INPUT_EMAIL.classList.add('form-control_validation');
          this.INPUT_PASSWD.classList.add('form-control_validation');
        } else {
          this.HELP_PASSWD.innerText = 'server error';
        }
        console.error(err);
      });
  }
}

const loginForm = new LoginForm();

const LOGIN_PAGE = createElement({
  tagname: 'div',
  options: [['className', 'login-wrapper']],
  childElements: [loginForm.FORM],
});

export default LOGIN_PAGE;
