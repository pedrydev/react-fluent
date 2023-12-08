import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

interface Features {
  test: boolean;
}

const FeatureContext = createContext<Features>(null!);

export default function FeatureProvider({ children }: PropsWithChildren) {
  const features = useMemo<Features>(() => ({
    test: import.meta.env.VITE_APP_FEATURE_TEST === '1',
  }), []);

  return (
    <FeatureContext.Provider value={features}>
      {children}
    </FeatureContext.Provider>
  );
}

export function useFeatures() {
  return useContext(FeatureContext);
}
