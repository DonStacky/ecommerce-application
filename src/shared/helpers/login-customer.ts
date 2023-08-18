import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import buildClient from './build-client';
import checkEnvVariables from './utilites';

export default function loginCustomer(email: string, password: string) {
  const ctpClient = buildClient(email, password);
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
  });

  return () => {
    return apiRoot.me().login().post({ body: { email, password } }).execute();
  };
}
