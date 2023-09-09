import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import buildCommonClient from '../../shared/api/create-common-client';
import checkEnvVariables from '../../shared/helpers/utilites';

const CHANNEL_ID = '3ac0cb8c-dda7-4247-beff-84d13ed06c16';

const ctpClient = buildCommonClient();
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
});

export function getProduct(ID: string) {
  return apiRoot.products().withId({ ID }).get().execute();
}

export function getCategories(ID: string) {
  return apiRoot.categories().withId({ ID }).get().execute();
}

export function getProductWithKey(key: string) {
  return apiRoot.products().withKey({ key }).get().execute();
}

export function createCart() {
  return apiRoot
    .me()
    .carts()
    .post({ body: { currency: 'USD' } })
    .execute();
}

export function getCart(ID: string) {
  return apiRoot.carts().withId({ ID }).get().execute();
}

export function getCartByCustomerId() {
  return apiRoot.carts().withCustomerId({ customerId: '683a47a2-cb36-422c-98b4-f98b7134fbf5' }).get().execute();
}

export function addLineItem(ID: string, productId: string, cartVersion: number) {
  return apiRoot
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
