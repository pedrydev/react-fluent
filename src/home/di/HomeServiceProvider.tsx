import { PropsWithChildren } from 'react';
import { ServiceProvider } from '@/core/providers/ServiceProvider.tsx';
import registerFn from './registerFn.ts';

export default function HomeServiceProvider({ children }: PropsWithChildren) {
  return (
    <ServiceProvider registerServices={registerFn}>
      {children}
    </ServiceProvider>
  );
}
