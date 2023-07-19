import { createContext, PropsWithChildren, useContext, useState } from "react";

const HelpPathContext = createContext<string>(null!);
const SetHelpPathContext = createContext<(path: string) => void>(null!);

export function HelpPathProvider({ children }: PropsWithChildren) {
  const [path, setPath] = useState("b2b/welcome");

  return (
    <SetHelpPathContext.Provider value={setPath}>
      <HelpPathContext.Provider value={path}>
        {children}
      </HelpPathContext.Provider>
    </SetHelpPathContext.Provider>
  );
}

export function useHelpPath() {
  return useContext(HelpPathContext);
}

export function useSetHelpPath() {
  return useContext(SetHelpPathContext);
}
