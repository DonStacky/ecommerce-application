import { createClientUpdate, getCustomerId } from './create-client-update';

function getVersion(): number {
  const userInformation = localStorage.getItem('userInformation');
  if (!userInformation) throw new Error('object "userInformation" not found');
  return JSON.parse(userInformation).version;
}

export function updateUserInformation(firstName: string, lastName: string, email: string, dateOfBirth: string) {
  const apiRoot = createClientUpdate();
  const customerID = getCustomerId();
  if (!customerID) throw new Error('not found UserID');

  return apiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version: getVersion(),
        actions: [
          {
            action: 'setFirstName',
            firstName,
          },
          {
            action: 'setLastName',
            lastName,
          },
          {
            action: 'changeEmail',
            email,
          },
          {
            action: 'setDateOfBirth',
            dateOfBirth,
          },
        ],
      },
    })
    .execute();
}

export function addAddress(country: string, city: string, streetName: string, postalCode: string) {
  const apiRoot = createClientUpdate();
  const customerID = getCustomerId();
  if (!customerID) throw new Error('not found UserID');

  return apiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version: getVersion(),
        actions: [
          {
            action: 'addAddress',
            address: {
              country,
              city,
              streetName,
              postalCode,
            },
          },
        ],
      },
    })
    .execute();
}

export function removeAddress(addressId: string) {
  const apiRoot = createClientUpdate();
  const customerID = getCustomerId();
  if (!customerID) throw new Error('not found UserID');

  return apiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version: getVersion(),
        actions: [
          {
            action: 'removeAddress',
            addressId,
          },
        ],
      },
    })
    .execute();
}

export function changeAddress(
  addressId: string,
  country: string,
  city: string,
  streetName: string,
  postalCode: string
) {
  const apiRoot = createClientUpdate();
  const customerID = getCustomerId();
  if (!customerID) throw new Error('not found UserID');

  return apiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version: getVersion(),
        actions: [
          {
            action: 'changeAddress',
            addressId,
            address: {
              country,
              city,
              streetName,
              postalCode,
            },
          },
        ],
      },
    })
    .execute();
}

export function setDefaultShippingAddress(addressId: string) {
  const apiRoot = createClientUpdate();
  const customerID = getCustomerId();
  if (!customerID) throw new Error('not found UserID');

  return apiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version: getVersion(),
        actions: [
          {
            action: 'setDefaultShippingAddress',
            addressId,
          },
        ],
      },
    })
    .execute();
}

export function setDefaultBillingAddress(addressId: string) {
  const apiRoot = createClientUpdate();
  const customerID = getCustomerId();
  if (!customerID) throw new Error('not found UserID');

  return apiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version: getVersion(),
        actions: [
          {
            action: 'setDefaultBillingAddress',
            addressId,
          },
        ],
      },
    })
    .execute();
}
