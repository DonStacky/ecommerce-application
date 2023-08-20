import { CustomerDraft, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { CustomerData } from '../../shared/types/types';
import checkEnvVariables from '../../shared/helpers/utilites';
import { findCountry } from './form-validation';
import buildCommonClient from '../../shared/helpers/create-client';
import showModal from './modal-window';
import ROUTER from '../../app/router/router';
import loginCustomer from '../../shared/helpers/login-customer';

function createCostumer(customerData: CustomerData): CustomerDraft {
  const billingAddress = {
    country: findCountry(customerData.billingAddress.country.value).ISO,
    streetName: customerData.billingAddress.streetName.value,
    postalCode: customerData.billingAddress.postalCode.value,
    city: customerData.billingAddress.city.value,
  };

  const shippingAddress = {
    country: findCountry(customerData.shippingAddress.country.value).ISO,
    streetName: customerData.shippingAddress.streetName.value,
    postalCode: customerData.shippingAddress.postalCode.value,
    city: customerData.shippingAddress.city.value,
  };

  const customerDraft: CustomerDraft = {
    firstName: customerData.firstName.value,
    lastName: customerData.lastName.value,
    email: customerData.email.value,
    password: customerData.password.value,
    dateOfBirth: customerData.birthDate.value,

    addresses: customerData.isCommonAddress.checked ? [billingAddress] : [billingAddress, shippingAddress],
    defaultBillingAddress: customerData.isBillingDefault.checked ? 0 : undefined,
    // eslint-disable-next-line no-nested-ternary
    defaultShippingAddress: customerData.isShippingDefault.checked
      ? customerData.isCommonAddress.checked
        ? 0
        : 1
      : undefined,
    shippingAddresses: customerData.isCommonAddress.checked ? [0] : [1],
    billingAddresses: [0],
  };

  return customerDraft;
}

async function registerCustomer(customerData: CustomerData) {
  const newCustomer = createCostumer(customerData);

  const ctpClient = buildCommonClient();
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
  });

  try {
    await apiRoot.customers().post({ body: newCustomer }).execute();
    await loginCustomer(customerData.email.value, customerData.password.value);
    ROUTER.navigate('/');
    showModal(true);
  } catch (err) {
    if (err instanceof Error) {
      showModal(false, err.message);
    }
  }
}

export default function submit(
  toDoList: (() => Promise<boolean>)[],
  extendedList: (() => Promise<boolean>)[],
  markerToExtend: HTMLInputElement,
  costumerTemplate: CustomerData
) {
  return async function submitForm(this: HTMLFormElement, e: Event) {
    e.preventDefault();
    this.classList.add('was-validated');

    const resultList = !markerToExtend.checked ? toDoList.concat(...extendedList) : toDoList;
    const results = await Promise.all(resultList.map((validation) => validation()));
    const validationResult = results.every((result) => result === true);
    console.log('validation result:', validationResult);
    if (validationResult) {
      registerCustomer(costumerTemplate);
    }
  };
}
