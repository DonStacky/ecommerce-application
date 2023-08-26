import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import checkEnvVariables from '../helpers/utilites';
import { buildClientUpdate } from './build-client';

function getCustomerId() {
  const userInformation = localStorage.getItem('userInformation');
  if (!userInformation) return undefined;

  return JSON.parse(userInformation).id;
}

function getToken() {
  const token = localStorage.getItem('tokenCache');
  if (!token) return undefined;
  return `Bearer ${JSON.parse(token).token}`;
}

export default function updateCustomer() {
  const token = getToken();
  const customerID = getCustomerId();
  if (!token || !customerID) throw new Error();
  const ctpClient = buildClientUpdate(token);
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
  });

  return apiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version: 8,
        actions: [
          {
            action: 'setFirstName',
            firstName: 'Joe',
          },
          {
            action: 'setLastName',
            lastName: 'Grebel',
          },
        ],
      },
    })
    .execute();
}
