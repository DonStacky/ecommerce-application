import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import buildCommonClient from '../../shared/api/create-common-client';
import checkEnvVariables from '../../shared/helpers/utilites';

const ctpClient = buildCommonClient();
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
});

export async function getProduct(ID: string) {
  return apiRoot.products().withId({ ID }).get().execute();
}

export async function getCategories(ID: string) {
  return apiRoot.categories().withId({ ID }).get().execute();
}

export async function getProductWithKey(key: string) {
  return apiRoot.products().withKey({ key }).get().execute();
}
