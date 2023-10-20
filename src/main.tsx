import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import 'reflect-metadata';
import AuthProvider from './core/auth/contexts/AuthProvider.tsx';
import ToastProvider from './core/feedback/ToastProvider.tsx';
import { HelpPathProvider } from './core/help/HelpPathContext.tsx';
import I18n from './core/providers/I18n.tsx';
import QueryProvider from './core/providers/QueryProvider.tsx';
import Theme from './core/providers/Theme.tsx';
import Routes from './core/routing/Routes.tsx';
import { Track } from './core/track/TrackContext.tsx';
import AppServiceProvider from './AppServiceProvider.tsx';
import './core/styles/tailwindcss.css';
import './core/styles/reset.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Theme>
    <AppServiceProvider>
      <QueryProvider>
        <ToastProvider>
          <Suspense>
            <I18n>
              <AuthProvider>
                <HelpPathProvider>
                  <Track appId='react-fluent-ui'>
                    <Routes />
                  </Track>
                </HelpPathProvider>
              </AuthProvider>
            </I18n>
          </Suspense>
        </ToastProvider>
      </QueryProvider>
    </AppServiceProvider>
  </Theme>,
);
