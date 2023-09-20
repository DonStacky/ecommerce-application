import {
  AnonymousAuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import checkEnvVariables from '../helpers/utilites';
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
