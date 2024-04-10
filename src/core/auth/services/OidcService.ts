import AuthResultModel from '@/core/auth/models/AuthResultModel.ts';

export default interface OidcService {
  login(): Promise<AuthResultModel>
  logout(): Promise<void>
  getToken(): string | undefined
}
