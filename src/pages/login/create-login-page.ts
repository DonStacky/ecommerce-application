import { createElement } from '../../shared/helpers/dom-utilites';

export default function createLoginPage() {
  const LABEL_EMAIL = createElement({
    tagname: 'label',
    options: [
      ['className', 'form-label'],
      ['htmlFor', 'exampleInputEmail1'],
      ['textContent', 'Email address'],
    ],
  });
  const INPUT_EMAIL = createElement({
    tagname: 'input',
    options: [
      ['className', 'form-control'],
      ['type', 'email'],
      ['id', 'exampleInputEmail1'],
    ],
  });

  INPUT_EMAIL.setAttribute('aria-describedby', 'emailHelp');

  const HELP_EMAIL = createElement({
    tagname: 'div',
    options: [
      ['className', 'form-text'],
      ['id', 'emailHelp'],
      ['textContent', "We'll never share your email with anyone else."],
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
      ['htmlFor', 'exampleInputPassword1'],
      ['textContent', 'Password'],
    ],
  });
  const INPUT_PASSWD = createElement({
    tagname: 'input',
    options: [
      ['className', 'form-control'],
      ['type', 'password'],
      ['id', 'exampleInputPassword1'],
    ],
  });
  const CONTAINER_PASSWD = createElement({
    tagname: 'div',
    childElements: [LABEL_PASSWD, INPUT_PASSWD],
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
      ['textContent', 'Check me out'],
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

  return FORM;
}
