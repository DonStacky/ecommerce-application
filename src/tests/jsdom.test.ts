/**
 * @jest-environment jsdom
 */

import { date, string } from 'yup';
import { validateString, validateDate, validatePostalCode } from '../pages/registration/form-validation';
import { createElement } from '../shared/helpers/dom-utilites';
import { CreateOptions } from '../shared/types/types';

//  createElement test cases

it('Should create element with a provided options', () => {
  const options: CreateOptions<keyof HTMLElementTagNameMap> = {
    tagname: 'div',
    childElements: [createElement({ tagname: 'span', options: [['textContent', 'another text']] })],
    options: [
      ['textContent', 'text'],
      ['className', 'class-selector'],
    ],
  };
  const element = createElement(options);

  const compareElement = document.createElement('div');
  const insertedElement = document.createElement('span');
  insertedElement.textContent = 'another text';
  compareElement.textContent = 'text';

  compareElement.append(insertedElement);
  compareElement.className = 'class-selector';
  expect(element).toEqual(compareElement);
});

it('Should add provided events', async () => {
  const eventFun = jest.fn();
  const options: CreateOptions<keyof HTMLElementTagNameMap> = {
    tagname: 'div',
    events: [['click', eventFun]],
  };
  const element = createElement(options);
  const event = new Event('click');
  element.dispatchEvent(event);
  expect(eventFun).toBeCalled();
});

// ValidateString test cases

it('Should validate input with provided schema', async () => {
  const inputElement = document.createElement('input');
  const errorElement = document.createElement('div');
  const schema = string().required();
  await validateString(errorElement, schema).apply(inputElement);
  expect(inputElement.checkValidity()).toBe(false);
});

it('Should validate input with provided schema', async () => {
  const inputElement = document.createElement('input');
  inputElement.value = 'inputExample';
  const errorElement = document.createElement('div');
  const schema = string().required();
  await validateString(errorElement, schema).apply(inputElement);
  expect(inputElement.checkValidity()).toBe(true);
});

it('Should change error element text with validation error ', async () => {
  const inputElement = document.createElement('input');
  const errorElement = document.createElement('div');
  const schema = string().required();
  await validateString(errorElement, schema).apply(inputElement);
  expect(errorElement.textContent).toBe('this is a required field');
});

it('Should change error element text with validation error ', async () => {
  const inputElement = document.createElement('input');
  inputElement.value = 'inputExample';
  const errorElement = document.createElement('div');
  const schema = string().required();
  await validateString(errorElement, schema).apply(inputElement);
  expect(errorElement.textContent).toBe('');
});

// ValidateDate test cases

it('Should validate date input with provided schema', async () => {
  const inputElement = document.createElement('input');
  const errorElement = document.createElement('div');
  const schema = date().required();
  await validateDate(errorElement, schema).apply(inputElement);
  expect(inputElement.checkValidity()).toBe(false);
});

it('Should validate date input with provided schema', async () => {
  const inputElement = document.createElement('input');
  inputElement.value = '2000-12-11';
  const errorElement = document.createElement('div');
  const schema = date().required();
  await validateDate(errorElement, schema).apply(inputElement);
  expect(inputElement.checkValidity()).toBe(true);
});

it('Should change error element text with validation error ', async () => {
  const inputElement = document.createElement('input');
  const errorElement = document.createElement('div');
  const schema = date().required();
  await validateDate(errorElement, schema).apply(inputElement);
  expect(errorElement.textContent).toBe(
    'this must be a `date` type, but the final value was: `Invalid Date` (cast from the value `Invalid Date`).'
  );
});

it('Should change error element text with validation error ', async () => {
  const inputElement = document.createElement('input');
  inputElement.value = '2000-12-11';
  const errorElement = document.createElement('div');
  const schema = date().required();
  await validateDate(errorElement, schema).apply(inputElement);
  expect(errorElement.textContent).toBe('');
});

// validatePostalCode test cases

it('Should validate postal code input with provided schema', async () => {
  const inputElement = document.createElement('input');
  const selectElement = document.createElement('select');
  const preselectedOption = document.createElement('option');
  const errorElement = document.createElement('div');
  selectElement.append(preselectedOption);

  inputElement.value = 'invalid postal code';
  preselectedOption.value = 'Russia';

  await validatePostalCode(selectElement, errorElement).apply(inputElement);
  expect(inputElement.checkValidity()).toBe(false);
});

it('Should validate postal code input with provided schema', async () => {
  const inputElement = document.createElement('input');
  const selectElement = document.createElement('select');
  const preselectedOption = document.createElement('option');
  const errorElement = document.createElement('div');
  selectElement.append(preselectedOption);

  inputElement.value = '123456';
  preselectedOption.value = 'Russia';

  await validatePostalCode(selectElement, errorElement).apply(inputElement);
  expect(inputElement.checkValidity()).toBe(true);
});

it('Should change error element text with validation error ', async () => {
  const inputElement = document.createElement('input');
  const selectElement = document.createElement('select');
  const preselectedOption = document.createElement('option');
  const errorElement = document.createElement('div');
  selectElement.append(preselectedOption);

  inputElement.value = 'invalid postal code';
  preselectedOption.value = 'Russia';

  await validatePostalCode(selectElement, errorElement).apply(inputElement);
  expect(errorElement.textContent).toBe('this should be a format of NNNNNN');
});

it('Should change error element text with validation error ', async () => {
  const inputElement = document.createElement('input');
  const selectElement = document.createElement('select');
  const preselectedOption = document.createElement('option');
  const errorElement = document.createElement('div');
  selectElement.append(preselectedOption);

  inputElement.value = '123456';
  preselectedOption.value = 'Russia';

  await validatePostalCode(selectElement, errorElement).apply(inputElement);
  expect(errorElement.textContent).toBe('');
});
