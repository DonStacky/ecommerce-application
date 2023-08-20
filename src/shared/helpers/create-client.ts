import { AuthMiddlewareOptions, ClientBuilder, HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import checkEnvVariables from './utilites';

export default function buildCommonClient() {
  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: checkEnvVariables(process.env.CTP_API_URL),
    fetch,
  };

  const options: AuthMiddlewareOptions = {
    host: checkEnvVariables(process.env.CTP_AUTH_URL),
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
    credentials: {
      clientId: checkEnvVariables(process.env.CTP_CLIENT_ID),
      clientSecret: checkEnvVariables(process.env.CTP_CLIENT_SECRET),
    },
    scopes: [checkEnvVariables(process.env.CTP_SCOPES)],
    fetch,
  };

  return new ClientBuilder()
    .withClientCredentialsFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
}
