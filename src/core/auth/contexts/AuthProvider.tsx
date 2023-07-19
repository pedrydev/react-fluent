import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import AuthModel from "@/core/auth/models/AuthModel.ts";
import UserModel from "@/core/auth/models/UserModel.ts";
import AuthService from "@/core/auth/services/AuthService.ts";

const AuthContext = createContext<AuthModel>(null!);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserModel | undefined>();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("code")) {
      AuthService.login(params.get("code") as string).then(_user => {
        window.history.pushState(
          {},
          import.meta.env.VITE_APP_NAME,
          window.location.href.split("?")[0]
        );
        setUser(_user);
      });
    } else {
      // AuthService.redirectToLogin();
      AuthService.login("code-challenge").then(_user => {
        window.history.pushState(
          {},
          import.meta.env.VITE_APP_NAME,
          window.location.href.split("?")[0]
        );
        setUser(_user);
      });
    }
  }, []);

  if (!user) return null;

  return (
    <AuthContext.Provider
      value={{
        user,
        logout: () => {
          AuthService.logout();
          setUser(undefined);
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
