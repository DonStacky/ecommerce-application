import { ClientBuilder, HttpMiddlewareOptions, PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import checkEnvVariables from '../helpers/utilites';

export default function buildClientWithPassowrdFlow(email: string, password: string) {
  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: checkEnvVariables(process.env.CTP_API_URL),
    fetch,
  };

  const options: PasswordAuthMiddlewareOptions = {
    host: checkEnvVariables(process.env.CTP_AUTH_URL),
    projectKey: checkEnvVariables(process.env.CTP_PROJECT_KEY),
    credentials: {
      clientId: checkEnvVariables(process.env.CTP_CLIENT_ID),
      clientSecret: checkEnvVariables(process.env.CTP_CLIENT_SECRET),
      user: {
        username: email,
        password,
      },
    },
    scopes: [checkEnvVariables(process.env.CTP_SCOPES)],
    fetch,
  };

  return new ClientBuilder()
    .withPasswordFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
}
