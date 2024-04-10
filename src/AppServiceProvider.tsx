import { PropsWithChildren } from 'react';
import { RootServiceProvider } from '@/core/providers/ServiceProvider.tsx';
import { HttpClientProvider } from '@/core/http/HttpClientProvider.tsx';

/**
 *
 * Register all services in one place so you can access services from other
 * modules. Keep in mind that you probably need to use tokens instead of
 * classes for some shared services such as HttpClient where each module
 * has his own backend
 *
 */
export default function AppServiceProvider({ children }: PropsWithChildren) {
  return (
    <RootServiceProvider>
      <HttpClientProvider>
          {children}
      </HttpClientProvider>
    </RootServiceProvider>
  );
}
