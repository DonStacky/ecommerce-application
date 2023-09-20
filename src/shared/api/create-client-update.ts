import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import checkEnvVariables from '../helpers/utilites';
import { buildClientUpdate } from './build-client';

function getToken() {
  const token = sessionStorage.getItem('tokenCache');
  if (!token) return undefined;
  return `Bearer ${JSON.parse(token).token}`;
}

export function getCustomerId(): string | undefined {
  const userInformation = localStorage.getItem('userInformation');
  if (!userInformation) return undefined;

  return JSON.parse(userInformation).id;
}

export function createClientUpdate() {
  const token = getToken();
  if (!token) throw new Error('not found Token');
  const ctpClient = buildClientUpdate(token);
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
  });

  return apiRoot;
}
