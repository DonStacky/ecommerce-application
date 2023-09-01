import buildCommonClient from '../../shared/api/create-common-client';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import checkEnvVariables from '../../shared/helpers/utilites';

async function getProducts() {
  const ctpClient = buildCommonClient();
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
  });

  return apiRoot.products().get().execute();
}

export const productsImgURL = getProducts().then(({ body }) => {
  let img: string | undefined;
  const length = body.results[0].masterData.current.masterVariant.images?.length;
  if (length) {
    img = body.results[0].masterData.current.masterVariant.images?.[length - 1].url;
  }
  return img;
});

export const productsTitle = getProducts().then(({ body }) => {
  return body.results[0].masterData.current.name.en;
});

export const productsText = getProducts().then(({ body }) => {
  return body.results[0].masterData.current.description?.en;
});

export const productID = getProducts().then(({ body }) => {
  return body.results[0].id;
});
