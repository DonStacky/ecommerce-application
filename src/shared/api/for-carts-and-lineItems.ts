import { Cart, createApiBuilderFromCtpClient, MyCartUpdate } from '@commercetools/platform-sdk';
import CONTENT from '../../pages/catalog/content';
import checkEnvVariables from '../helpers/utilites';
import buildCommonClient from './create-common-client';

localStorage.setItem('cartUpdatePermission', 'true');

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

// Использовать только в случае манипуляции с картой (в любых других случаях брать карту из localStorage)
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
      myCart = (await createCart()).body;
    } finally {
      [...CONTENT.children].forEach((card: Element) => {
        card.dispatchEvent(new CustomEvent<Cart | null>('successUpdateCart', { detail: myCart }));
      });
    }
  }

  localStorage.setItem('MyCart', JSON.stringify(myCart));

  return myCart;
}

export async function updateCart(id: string, updateRequest: MyCartUpdate) {
  localStorage.removeItem('cartUpdatePermission');

  const ctpClient = buildCommonClient();
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
  });

  const { body: cart } = await apiRoot
    .me()
    .carts()
    .withId({ ID: id })
    .post({
      body: updateRequest,
    })
    .execute();
  localStorage.setItem('cartUpdatePermission', 'true');

  return cart;
}

export function getCart(ID: string) {
  const ctpClient = buildCommonClient();
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
  });

  return apiRoot.me().carts().withId({ ID }).get().execute();
}

export async function addLineItem(ID: string, productId: string, cartVersion: number) {
  const changedCart = await updateCart(ID, {
    version: cartVersion,
    actions: [{ action: 'addLineItem', productId, variantId: 1, quantity: 1 }],
  });

  return changedCart;
}

export async function removeLineItem(ID: string, cartVersion: number, lineItemId: string /* , centAmount: number */) {
  const changedCart = await updateCart(ID, {
    version: cartVersion,
    actions: [
      {
        action: 'removeLineItem',
        lineItemId,
      },
    ],
  });
  return changedCart;
}

export async function changeLineItemQuantity(ID: string, lineItemId: string, cartVersion: number, quantity: number) {
  localStorage.removeItem('cartUpdatePermission');

  const ctpClient = buildCommonClient();
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
  });

  const changedCart = await apiRoot
    .me()
    .carts()
    .withId({ ID })
    .post({
      body: {
        version: cartVersion,
        actions: [
          {
            action: 'changeLineItemQuantity',
            lineItemId,
            quantity,
          },
        ],
      },
    })
    .execute();
  localStorage.setItem('cartUpdatePermission', 'true');

  return changedCart;
}

export async function deleteCart(ID: string, cartVersion: number) {
  localStorage.removeItem('cartUpdatePermission');

  const ctpClient = buildCommonClient();
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
  });

  const changedCart = await apiRoot
    .me()
    .carts()
    .withId({ ID })
    .delete({
      queryArgs: {
        version: cartVersion,
      },
    })
    .execute();
  localStorage.setItem('cartUpdatePermission', 'true');

  return changedCart;
}

export function applyDiscountCode(ID: string, cartVersion: number, code: string) {
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
            action: 'addDiscountCode',
            code,
          },
        ],
      },
    })
    .execute();
}
