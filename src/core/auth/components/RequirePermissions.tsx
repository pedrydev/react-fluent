import { Subtitle1 } from "@fluentui/react-components";
import { ShieldProhibited24Filled } from "@fluentui/react-icons";
import { PropsWithChildren } from "react";
import { useAuth } from "@/core/auth/contexts/AuthProvider.tsx";
import { AppAdmin } from "@/core/auth/models/AppPermissions.ts";
import usePalette from "@/core/styles/usePalette.ts";

export interface RequirePermissionsProps {
  permissions: string[];
}

export function RequirePermissions({
                                     children,
                                     permissions
                                   }: PropsWithChildren<RequirePermissionsProps>) {
  const { user } = useAuth();
  const palette = usePalette();

  if (user.permissions.some(p1 => p1 === AppAdmin || permissions.some(p2 => p1 === p2)))
    return <>{children}</>;

  return (
    <div className="flex flex-col items-center w-full">
      <ShieldProhibited24Filled className={palette.textError} />
      <Subtitle1>You don't have permission to access this page</Subtitle1>
    </div>
  );
}
