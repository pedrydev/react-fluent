import { JSXElementConstructor, PropsWithChildren } from 'react';

export type BuildProvidersTreeArgs = [JSXElementConstructor<any>] | [JSXElementConstructor<any>, { [key: string]: any }]

// https://x.com/_georgemoller/status/1744331324037419145?s=20
export default function buildProvidersTree(providers: BuildProvidersTreeArgs[]) {
  const initialProvider = ({ children }: PropsWithChildren) => <>{children}</>;
  return providers.reduce(
    (AccumulateProvider, [Provider, props = {}]) => {
      return ({ children }) => (
        <AccumulateProvider>
          <Provider {...props}>
            {children}
          </Provider>
        </AccumulateProvider>
      );
    },
    initialProvider,
  );
}
