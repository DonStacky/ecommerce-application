/**
 * @jest-environment jsdom
 */

import { createCustomerFromTemlate } from '../../pages/registration/customer-registration';
import { createElement } from '../../shared/helpers/dom-utilites';
import { CustomerData } from '../../shared/types/types';

describe('createCustomerFromTemlate', () => {
  it('Should create customer data from form template', () => {
    const CUSTOMER_TEMPLATE: CustomerData = {
      isCommonAddress: createElement({ tagname: 'input', options: [['checked', false]] }),
      isBillingDefault: createElement({ tagname: 'input', options: [['checked', true]] }),
      isShippingDefault: createElement({ tagname: 'input', options: [['checked', true]] }),
      firstName: createElement({ tagname: 'input', options: [['value', 'userName']] }),
      lastName: createElement({ tagname: 'input', options: [['value', 'userLastName']] }),
      email: createElement({ tagname: 'input', options: [['value', 'user@email.com']] }),
      password: createElement({ tagname: 'input', options: [['value', 'userPassword']] }),
      birthDate: createElement({ tagname: 'input', options: [['value', 'DD-MM-YYYY']] }),
      billingAddress: {
        country: createElement({
          tagname: 'select',
          childElements: [createElement({ tagname: 'option', options: [['textContent', 'Russia']] })],
        }),
        city: createElement({ tagname: 'input', options: [['value', 'billingCity']] }),
        streetName: createElement({ tagname: 'input', options: [['value', 'billingStreet']] }),
        postalCode: createElement({ tagname: 'input', options: [['value', 'billingPostalCode']] }),
      },
      shippingAddress: {
        country: createElement({
          tagname: 'select',
          childElements: [createElement({ tagname: 'option', options: [['textContent', 'Poland']] })],
        }),
        city: createElement({ tagname: 'input', options: [['value', 'shippingCity']] }),
        streetName: createElement({ tagname: 'input', options: [['value', 'shippingStreet']] }),
        postalCode: createElement({ tagname: 'input', options: [['value', 'shippingPostalCode']] }),
      },
    };

    const customerData = createCustomerFromTemlate(CUSTOMER_TEMPLATE);

    expect(customerData).toEqual({
      firstName: 'userName',
      lastName: 'userLastName',
      email: 'user@email.com',
      password: 'userPassword',
      dateOfBirth: 'DD-MM-YYYY',

      addresses: [
        {
          country: 'RU',
          streetName: 'billingStreet',
          postalCode: 'billingPostalCode',
          city: 'billingCity',
        },
        {
          country: 'PL',
          streetName: 'shippingStreet',
          postalCode: 'shippingPostalCode',
          city: 'shippingCity',
        },
      ],
      defaultBillingAddress: 0,
      defaultShippingAddress: 1,
      shippingAddresses: [1],
      billingAddresses: [0],
    });
  });
});
