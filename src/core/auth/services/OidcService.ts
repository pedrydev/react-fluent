import AuthResultModel from '@/core/auth/models/AuthResultModel.ts';

export default class OidcService {
  login(): Promise<AuthResultModel> {
    return Promise.reject('Unregister service');
  }

  logout(): Promise<void> {
    return Promise.reject('Unregister service');
  }

  getToken(): string | undefined {
    throw new Error('Unregister service');
  }
}
