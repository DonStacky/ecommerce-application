import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import checkEnvVariables from '../helpers/utilites';
import { buildClientUpdate } from './build-client';

function getCustomerId(): string | undefined {
  const userInformation = localStorage.getItem('userInformation');
  if (!userInformation) return undefined;

  return JSON.parse(userInformation).id;
}

function getToken() {
  const token = localStorage.getItem('tokenCache');
  if (!token) return undefined;
  return `Bearer ${JSON.parse(token).token}`;
}

function getVersion(): number {
  const userInformation = localStorage.getItem('userInformation');
  if (!userInformation) throw new Error('object "userInformation" not found');
  return JSON.parse(userInformation).version;
}

export default function updateCustomer(firstName: string, lastName: string, email: string, dateOfBirth: string) {
  const token = getToken();
  const customerID = getCustomerId();
  if (!token || !customerID) throw new Error('not found Token or UserID');
  const ctpClient = buildClientUpdate(token);
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
  });

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
          /* {
            action: 'addAddress',
            address: {
              country: 'RU',
              city: 'Borisovo',
              streetName: 'Gaidara',
              postalCode: '456789',
            },
          }, */
        ],
      },
    })
    .execute();
}
