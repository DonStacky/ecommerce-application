import loginValidationResults from '../../shared/helpers/data';
import { createElement } from '../../shared/helpers/dom-utilites';
import { LoginValidation } from '../../shared/types/types';
import { loginValidation, passwordValidation } from './login-validation';

class LoginForm {
  LINK_TO_REG: HTMLAnchorElement;

  REDIRECT_TO_REG: HTMLSpanElement;

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
    this.LINK_TO_REG = createElement({
      tagname: 'a',
      options: [
        ['textContent', 'Sign up'],
        ['href', `/registration`],
        ['className', 'link-login'],
      ],
    });
    this.LINK_TO_REG.dataset.navigo = 'true';
    this.REDIRECT_TO_REG = createElement({
      tagname: 'span',
      options: [
        ['textContent', `Don't have an account yet? `],
        ['className', 'form-label'],
      ],
      childElements: [this.LINK_TO_REG],
    });
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
      childElements: [
        this.REDIRECT_TO_REG,
        this.CONTAINER_EMAIL,
        this.CONTAINER_PASSWD,
        this.CONTAINER_CHECK,
        this.BUTTON,
      ],
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
  }

  private liveValidation(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    if (target.tagName !== 'INPUT') return;

    const text = target.value;

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

  private createBtnStatus(obj: LoginValidation) {
    if (obj.login && obj.password) {
      this.BUTTON.removeAttribute('disabled');
      this.BUTTON.addEventListener('click', this.submit);
    } else {
      this.BUTTON.setAttribute('disabled', '');
      this.BUTTON.removeEventListener('click', this.submit);
    }
  }

  // TODO Дописать сабмит формы на сервер
  private submit(event: MouseEvent) {
    const target = event.target as HTMLButtonElement;
    if (target.tagName !== 'BUTTON') return;
    event.preventDefault();
    console.log('submit');
  }
}

const loginForm = new LoginForm();

const LOGIN_PAGE = createElement({
  tagname: 'div',
  options: [['className', 'login-wrapper']],
  childElements: [loginForm.FORM],
});

export default LOGIN_PAGE;
