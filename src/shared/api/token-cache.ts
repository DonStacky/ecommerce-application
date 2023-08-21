import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

export default class MyTokenCache implements TokenCache {
  myCaсhe: TokenStore = {
    token: 'null',
    expirationTime: 0,
    refreshToken: undefined,
  };

  set(newCache: TokenStore) {
    localStorage.setItem('tokenCache', JSON.stringify(newCache));
    this.myCaсhe = newCache;
  }

  get() {
    return this.myCaсhe;
  }
}
