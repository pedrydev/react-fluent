import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { PropsWithChildren } from "react";

export default function Theme({ children }: PropsWithChildren) {
  return (
    <FluentProvider theme={webLightTheme}>
      {children}
    </FluentProvider>
  );
}
