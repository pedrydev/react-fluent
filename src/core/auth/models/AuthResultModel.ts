import UserModel from '@/core/auth/models/UserModel.ts';

export default interface AuthResultModel {
  user?: UserModel;
  success: boolean;
}
