export default interface UserModel {
  sub: string;
  username: string;
  name: string;
  permissions: string[];
  profileUrl: string;
}
