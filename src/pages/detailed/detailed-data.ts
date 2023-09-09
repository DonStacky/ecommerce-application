import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import buildCommonClient from '../../shared/api/create-common-client';
import checkEnvVariables from '../../shared/helpers/utilites';

const CHANNEL_ID = '3ac0cb8c-dda7-4247-beff-84d13ed06c16';

export function getProduct(ID: string) {
  const ctpClient = buildCommonClient();
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
  });

  return apiRoot.products().withId({ ID }).get().execute();
}

export function getCategories(ID: string) {
  const ctpClient = buildCommonClient();
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
  });

  return apiRoot.categories().withId({ ID }).get().execute();
}

export function getProductWithKey(key: string) {
  const ctpClient = buildCommonClient();
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
  });

  return apiRoot.products().withKey({ key }).get().execute();
}

export function createCart() {
  const ctpClient = buildCommonClient();
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
  });

  return apiRoot
    .me()
    .carts()
    .post({ body: { currency: 'USD' } })
    .execute();
}

export function getCart(ID: string) {
  const ctpClient = buildCommonClient();
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
  });

  return apiRoot.carts().withId({ ID }).get().execute();
}

export function addLineItem(ID: string, productId: string, cartVersion: number) {
  const ctpClient = buildCommonClient();
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
  });

  return apiRoot
    .me()
    .carts()
    .withId({ ID })
    .post({
      body: {
        version: cartVersion,
        actions: [
          {
            action: 'addLineItem',
            productId,
            variantId: 1,
            quantity: 1,
            supplyChannel: {
              typeId: 'channel',
              id: CHANNEL_ID,
            },
            distributionChannel: {
              typeId: 'channel',
              id: CHANNEL_ID,
            },
          },
        ],
      },
    })
    .execute();
}

export function removeLineItem(ID: string, cartVersion: number, lineItemId: string, centAmount: number) {
  const ctpClient = buildCommonClient();
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
  });

  return apiRoot
    .carts()
    .withId({ ID })
    .post({
      body: {
        version: cartVersion,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId,
            quantity: 1,
            externalPrice: {
              currencyCode: 'USD',
              centAmount,
            },
          },
        ],
      },
    })
    .execute();
}
