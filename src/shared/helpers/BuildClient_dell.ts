import { ClientBuilder, HttpMiddlewareOptions, PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

const options: PasswordAuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: 'span_team-ecom_app',
  credentials: {
    clientId: 'Scq0SI2cNZ3UmMQe-JDrJxcX',
    clientSecret: 'IiGuI_e0am_PA8Dcds_9xMkhIc0eIvn_',
    user: {
      username: 'a@b.com',
      password: '`1qZzzzz',
    },
  },
  scopes: [`manage_project:span_team-ecom_app`],
  fetch,
};
// Export the ClientBuilder
export default new ClientBuilder()
  .withPasswordFlow(options)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
