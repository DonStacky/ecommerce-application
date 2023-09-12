import {
  AnonymousAuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import checkEnvVariables from '../helpers/utilites';
// import { createElement } from '../helpers/dom-utilites';
// import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import MyTokenCache from './token-cache';

export default function buildCommonClient() {
  const refreshToken = localStorage.getItem('refreshToken') || '';

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: checkEnvVariables(process.env.CTP_API_URL),
    fetch,
  };

  const CREDENTIALS = {
    host: checkEnvVariables(process.env.CTP_AUTH_URL),
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
    credentials: {
      clientId: checkEnvVariables(process.env.CTP_CLIENT_ID),
      clientSecret: checkEnvVariables(process.env.CTP_CLIENT_SECRET),
    },
    tokenCache: new MyTokenCache(),
  };

  const refreshOptions: RefreshAuthMiddlewareOptions = {
    ...CREDENTIALS,
    refreshToken,
  };

  const anonymousOptions: AnonymousAuthMiddlewareOptions = {
    ...CREDENTIALS,
    scopes: [checkEnvVariables(process.env.CTP_SCOPES)],
  };

  return refreshToken
    ? new ClientBuilder().withHttpMiddleware(httpMiddlewareOptions).withRefreshTokenFlow(refreshOptions).build()
    : new ClientBuilder().withHttpMiddleware(httpMiddlewareOptions).withAnonymousSessionFlow(anonymousOptions).build();
}
// hGkjMtyEEng1dQvLikV0TWQKV2wTENqk anon token  span_team-ecom_app:gkMwJzhVGepH7WLB8qUiMqek8xLBbJODa1NDG7M7V8s
//               Проверка слияния карт анонимного пользователя при логине/регистрации
//
//               Карты созданные пользователем в анонимном режиме добавляются при логине/регистрации пользователя
//
//
// document.body.append(
//   createElement({
//     tagname: 'button',
//     options: [
//       ['textContent', 'log my cards'],
//       ['className', 'btn fs-1 btn-danger'],
//     ],
//     events: [
//       [
//         'click',
//         async () => {
//           const ctpClient = buildCommonClient();
//           const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
//             projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
//           });
//           const cards = await apiRoot.me().carts().get().execute();
//           console.log(cards);
//         },
//       ],
//     ],
//   })
// );

// document.body.append(
//   createElement({
//     tagname: 'button',
//     options: [
//       ['textContent', 'createCart'],
//       ['className', 'btn fs-1 btn-danger'],
//     ],
//     events: [
//       [
//         'click',
//         () => {
//           const ctpClient = buildCommonClient();
//           const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
//             projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
//           });
//           apiRoot
//             .me()
//             .carts()
//             .post({
//               body: {
//                 currency: 'USD',
//               },
//             })
//             .execute();
//         },
//       ],
//     ],
//   })
// );
