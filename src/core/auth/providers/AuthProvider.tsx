import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import AuthFunctionsModel from '@/core/auth/models/AuthFunctionsModel.ts';
import UserModel from '@/core/auth/models/UserModel.ts';
import { useService } from '@/core/providers/ServiceProvider.tsx';
import OidcService from '@/core/auth/services/OidcService.ts';
import { Body1 } from '@fluentui/react-components';

const AuthFunctionsContext = createContext<AuthFunctionsModel>(null!);
const UserContext = createContext<UserModel | undefined>(undefined);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserModel | undefined>();
  const [functions] = useState<AuthFunctionsModel>({
    logout: () => {
      setUser(undefined);
    },
  });

  const service = useService(OidcService);

  useEffect(() => {
    async function init() {
      const result = await service.login();
      if (result.success)
        setUser(result.user as UserModel);
    }

    if (!user)
      init();
  }, [user]);

  if (!user)
    return <Body1>Loading</Body1>;

  return (
    <AuthFunctionsContext.Provider value={functions}>
      <UserContext.Provider value={user}>
        {children}
      </UserContext.Provider>
    </AuthFunctionsContext.Provider>
  );
}

export function useAuthFunctions() {
  return useContext(AuthFunctionsContext);
}

export function useUser() {
  return useContext(UserContext);
}
