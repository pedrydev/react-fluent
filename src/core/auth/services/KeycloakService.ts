import { injectable } from 'tsyringe';
import Keycloak from 'keycloak-js';
import AuthResultModel from '@/core/auth/models/AuthResultModel.ts';
import OidcService from '@/core/auth/services/OidcService.ts';

const keycloak = new Keycloak({
  clientId: import.meta.env.VITE_APP_KEYCLOAK_CLIENT_ID,
  realm: import.meta.env.VITE_APP_KEYCLOAK_REALM,
  url: import.meta.env.VITE_APP_KEYCLOAK_URL,
});

@injectable()
export default class KeycloakService extends OidcService {
  private readonly validityBeforeTokenExpirationInSeconds = 30;
  private keycloakInitalized = false;

  async login(): Promise<AuthResultModel> {
    try {
      if (!this.keycloakInitalized) {
        await keycloak.init({
          onLoad: 'login-required',
          redirectUri: window.location.origin,
          refreshToken: window.localStorage.getItem('rt') ?? undefined,
        });
        this.keycloakInitalized = true;
      }
      if (!keycloak.authenticated)
        await keycloak.login();
      await keycloak.loadUserProfile();
      await keycloak.loadUserInfo();
      setInterval(async () => {
        if (keycloak.isTokenExpired(this.validityBeforeTokenExpirationInSeconds)) {
          const tokenRefreshed = await keycloak.updateToken(this.validityBeforeTokenExpirationInSeconds);
          if (!tokenRefreshed) {
            // TODO: Display some error message
            await keycloak.logout();
          }
        }
      }, this.validityBeforeTokenExpirationInSeconds);
      window.localStorage.setItem('rt', keycloak.refreshToken as string);
      return {
        user: {
          sub: keycloak.tokenParsed?.sub as string,
          name: keycloak.tokenParsed?.name as string,
          username: keycloak.tokenParsed?.preferred_username as string,
          profileUrl: keycloak.createAccountUrl(),
          permissions: keycloak.tokenParsed?.resource_access?.dms?.roles ?? [],
        },
        success: true,
      };
    } catch (e) {
      console.error(e);
      return { success: false };
    }
  }

  logout() {
    return keycloak.logout();
  }

  getToken() {
    return keycloak.token;
  }
}
