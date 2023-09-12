import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

export default class MyTokenCache implements TokenCache {
  myCaсhe = (() => {
    const cachedToken: TokenStore | null = JSON.parse(sessionStorage.getItem('tokenCache') || 'null');
    if (cachedToken && cachedToken.expirationTime - Date.now() > 0) {
      return cachedToken;
    }
    return {
      token: 'null',
      expirationTime: 0,
      refreshToken: undefined,
    };
  })();

  set(newCache: TokenStore) {
    if (newCache.refreshToken) {
      localStorage.setItem('refreshToken', `${newCache.refreshToken}`);
      sessionStorage.setItem('tokenCache', JSON.stringify(newCache));
    }
    this.myCaсhe = newCache;
  }

  get() {
    return this.myCaсhe;
  }
}
