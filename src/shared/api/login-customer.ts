import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import checkEnvVariables from '../helpers/utilites';
import buildClientWithPassowrdFlow from './build-client';
import buildCommonClient from './create-common-client';

export default async function loginCustomer(email: string, password: string) {
  const commonClient = buildCommonClient();
  const commonRoot = createApiBuilderFromCtpClient(commonClient).withProjectKey({
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
  });
  const result = await commonRoot.me().login().post({ body: { email, password } }).execute();
  localStorage.removeItem('tokenCache');

  const ctpClient = buildClientWithPassowrdFlow(email, password);
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
  });
  await apiRoot.me().login().post({ body: { email, password } }).execute();
  localStorage.setItem('isLogged', 'true');

  return result;
}
