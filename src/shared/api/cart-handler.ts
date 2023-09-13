import { Cart, MyCartUpdate, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import buildCommonClient from './create-common-client';
import checkEnvVariables from '../helpers/utilites';
import CONTENT from '../../pages/catalog/content';

async function createCart() {
  const ctpClient = buildCommonClient();
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
  });

  const { body: cart } = await apiRoot
    .me()
    .carts()
    .post({
      body: {
        currency: 'USD',
      },
    })
    .execute();

  return cart;
}

export async function replicateCart(cartIdToReplicate: string) {
  const ctpClient = buildCommonClient();
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
  });

  const { body: cart } = await apiRoot
    .me()
    .carts()
    .replicate()
    .post({
      body: {
        reference: { id: cartIdToReplicate, typeId: 'cart' },
      },
    })
    .execute();
  localStorage.setItem('MyCart', JSON.stringify(cart));
}

export async function checkCart() {
  const ctpClient = buildCommonClient();
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
  });

  let myCart: null | Cart = JSON.parse(localStorage.getItem('MyCart') || 'null');

  if (!myCart) {
    try {
      myCart = (await apiRoot.me().activeCart().get().execute()).body;
    } catch {
      myCart = await createCart();
    } finally {
      [...CONTENT.children].forEach((card: Element) => {
        card.dispatchEvent(new CustomEvent<Cart | null>('successUpdateCart', { detail: myCart }));
      });
    }
  }

  localStorage.setItem('MyCart', JSON.stringify(myCart));

  return myCart;
}

export async function updateCart(updateRequest: MyCartUpdate['actions']) {
  const { id: cartId, version: cartVersion } = await checkCart();

  const ctpClient = buildCommonClient();
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
  });

  const { body: cart } = await apiRoot
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: { actions: updateRequest, version: cartVersion },
    })
    .execute();

  localStorage.setItem('MyCart', JSON.stringify(cart));

  [...CONTENT.children].forEach((card: Element) => {
    card.dispatchEvent(new CustomEvent<Cart | null>('successUpdateCart', { detail: cart }));
  });

  return cart;
}
