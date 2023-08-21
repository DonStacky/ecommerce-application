import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import checkEnvVariables from '../helpers/utilites';
import buildClientWithPassowrdFlow from './build-client';

export default function loginCustomer(email: string, password: string) {
  const ctpClient = buildClientWithPassowrdFlow(email, password);
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
  });

  return apiRoot.me().login().post({ body: { email, password } }).execute();
}
