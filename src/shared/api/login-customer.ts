import { Cart, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import checkEnvVariables from '../helpers/utilites';
import buildClientWithPassowrdFlow from './build-client';
import CONTENT from '../../pages/catalog/content';

export default async function loginCustomer(email: string, password: string) {
  const anonymousCart: Cart | null = JSON.parse(localStorage.getItem('MyCart') || 'null');
  const anonymousCartId = localStorage.getItem('isLogged') ? undefined : anonymousCart?.anonymousId;

  sessionStorage.removeItem('tokenCache');

  const ctpClient = buildClientWithPassowrdFlow(email, password);
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
  });
  const result = (
    await apiRoot
      .login()
      .post({
        body: { email, password, anonymousId: anonymousCartId, anonymousCartSignInMode: 'UseAsNewActiveCustomerCart' },
      })
      .execute()
  ).body;
  localStorage.setItem('isLogged', 'true');

  if (result.cart) {
    localStorage.setItem('MyCart', JSON.stringify(result.cart));
    [...CONTENT.children].forEach((card: Element) => {
      card.dispatchEvent(new CustomEvent<Cart | null>('successUpdateCart', { detail: result.cart }));
    });
  }

  return result.customer;
}
