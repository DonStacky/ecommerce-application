import buildCommonClient from '../../shared/api/create-common-client';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import checkEnvVariables from '../../shared/helpers/utilites';

export async function getProduct(ID: string) {
  const ctpClient = buildCommonClient();
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
  });

  return apiRoot.products().withId({ ID }).get().execute();
}

export async function getCategories(ID: string) {
  const ctpClient = buildCommonClient();
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
  });

  return apiRoot.categories().withId({ ID }).get().execute();
}

export async function getProductWithKey(key: string) {
  const ctpClient = buildCommonClient();
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
  });

  return apiRoot.products().withKey({ key }).get().execute();
}
