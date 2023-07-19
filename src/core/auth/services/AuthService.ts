import jwtDecode from "jwt-decode";
import TokensModel from "@/core/auth/models/TokensModel.ts";
import CryptoService from "@/core/auth/services/CryptoService.ts";
import UserModel from "@/core/auth/models/UserModel.ts";

export default class AuthService {
  static async redirectToLogin() {
    const params = new URLSearchParams();
    params.append("client_id", import.meta.env.VITE_APP_CLIENT_ID);
    params.append("redirect_uri", import.meta.env.VITE_APP_REDIRECT_URI);
    params.append("response_type", "code");
    const { codeChallenge, codeVerifier } = await AuthService.generateCodeChallenge();
    params.append("code_challenge", codeChallenge);
    params.append("code_verifier", codeVerifier);
    window.location.href = `${import.meta.env.VITE_APP_LOGIN_URI}?${params.toString()}`;
  }

  static async login(code: string) {
    // Call token endpoint with code and decrypt TokensModel result
    const fakeTokensModel: TokensModel = {
      accessToken:
        "ewogICJhbGciOiAiSFMyNTYiLAogICJ0eXAiOiAiSldUIgp9.ewogICJhdXRob3JpdHkiOiAiaHR0cHM6Ly9sb2NhbGhvc3Q6OTc5OCIsCiAgInBlcm1pc3Npb25zIjogWwogICAgImF1dGguYWNjb3VudC5tZS5yZWFkIiwKICAgICJhdXRoLmFjY291bnQubWUud3JpdGUiLAogICAgImIyYi5hZG1pbiIKICBdCn0.nsdjvjosdvowvo[wvo[wecvevwevweascasbiqwbdqw",
      identityToken:
        "ewogICJhbGciOiAiSFMyNTYiLAogICJ0eXAiOiAiSldUIgp9.ewogICJzdWIiOiAicmFuZG9tLXV1aWQiLAogICJ1c2VybmFtZSI6ICJwZWRyeSIsCiAgInByb2ZpbGVVcmwiOiAiaHR0cHM6Ly90aC5iaW5nLmNvbS90aC9pZC9PSVAuOHlLZEN3S3lLdHN5SHBYb0NJSlMtZ0hhRTg_dz0yODcmaD0xODYmYz03JnI9MCZvPTUmZHByPTEuMyZwaWQ9MS43IiwKICAicGVybWlzc2lvbnMiOiBbCiAgICAiYjJiL2FkbWluIgogIF0KfQ.nsdjvjosdvowvo[wvo[wecvevwevweascasbiqwbdqw",
      refreshToken: "refreshToken"
    };
    const user = jwtDecode(fakeTokensModel.identityToken) as UserModel;
    window.sessionStorage.setItem("access_token", fakeTokensModel.accessToken);
    window.sessionStorage.setItem("refresh_token", fakeTokensModel.refreshToken);
    return Promise.resolve(user);
  }

  static logout() {
    window.sessionStorage.removeItem("access_token");
    window.sessionStorage.removeItem("refresh_token");
    // this.redirectToLogin()
  }

  private static async generateCodeChallenge() {
    const codeVerifier = CryptoService.generateCodeVerifier();
    const hashed = await CryptoService.sha256(codeVerifier);
    const codeChallenge = CryptoService.base64UrlEncode(hashed);
    return { codeVerifier, codeChallenge };
  }
}
