import UserModel from '@/core/auth/models/UserModel.ts';

export default interface AuthModel {
  logout: () => void;
  user: UserModel;
}
