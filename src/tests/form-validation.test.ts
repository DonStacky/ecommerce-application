/**
 * @jest-environment jsdom
 */

import { date, string } from 'yup';
import { validateString, validateDate, validatePostalCode } from '../pages/registration/form-validation';

describe('validateString', () => {
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
});

describe('ValidateDate', () => {
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

    expect(errorElement.textContent).toBe('Please enter correct date');
  });

  it('Should change error element text with validation error ', async () => {
    const inputElement = document.createElement('input');
    inputElement.value = '2000-12-11';
    const errorElement = document.createElement('div');
    const schema = date().required();

    await validateDate(errorElement, schema).apply(inputElement);

    expect(errorElement.textContent).toBe('');
  });
});

describe('validatePostalCode', () => {
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

    expect(errorElement.textContent).toBe('Please enter correct postal code. Postal code should be a format of NNNNNN');
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
});
