import { DateSchema, StringSchema, ValidationError, string } from 'yup';
import countries from './postal-codes';

export function validateString(errorElement: HTMLElement, schema: StringSchema) {
  const boundedElement = errorElement;

  return async function validateOnChange(this: HTMLInputElement | HTMLSelectElement) {
    try {
      await schema.validate(this.value);
      this.setCustomValidity('');
    } catch (err) {
      if (err instanceof ValidationError) {
        this.setCustomValidity('invalid');
        boundedElement.textContent = err.message;
        return false;
      }
    }
    return true;
  };
}

export const MIN_AGE_MILISEC = 410240376000;

export function validateDate(errorElement: HTMLElement, schema: DateSchema) {
  const boundedElement = errorElement;

  return async function validateOnChange(this: HTMLInputElement | HTMLSelectElement) {
    try {
      await schema.validate(new Date(this.value));
      this.setCustomValidity('');
    } catch (err) {
      if (err instanceof ValidationError) {
        this.setCustomValidity('invalid');
        boundedElement.textContent =
          err.message ===
          'this must be a `date` type, but the final value was: `Invalid Date` (cast from the value `Invalid Date`).'
            ? 'Please enter correct date'
            : err.message;
        return false;
      }
    }
    return true;
  };
}

const COUNTRY_INFO = {
  Note: '',
  Country: '',
  ISO: '',
  Format: '',
  Regex: '',
};

export function findCountry(countryName: string) {
  const foundCountry = countries.filter((country) => country.Country === countryName);
  return foundCountry.length ? foundCountry[0] : COUNTRY_INFO;
}

export function validatePostalCode(selectElement: HTMLSelectElement, errorElement: HTMLElement) {
  const boundedElement = errorElement;

  return async function validateOnChange(this: HTMLInputElement) {
    try {
      await string()
        .matches(
          new RegExp(findCountry(selectElement.value).Regex),
          `Please enter correct postal code. Postal code should be a format of ${
            findCountry(selectElement.value).Format
          }`
        )
        .validate(this.value);

      this.setCustomValidity('');
    } catch (err) {
      if (err instanceof ValidationError) {
        this.setCustomValidity('invalid');
        boundedElement.textContent = err.message;
        return false;
      }
      console.log(err);
    }
    return true;
  };
}
