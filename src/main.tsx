import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import 'reflect-metadata';
import AuthProvider from '@/core/auth/providers/AuthProvider.tsx';
import ToastProvider from './core/feedback/ToastProvider.tsx';
import { HelpPathProvider } from './core/help/HelpPathContext.tsx';
import FeatureProvider from './core/providers/FeatureProvider.tsx';
import I18n from './core/providers/I18n.tsx';
import QueryProvider from './core/providers/QueryProvider.tsx';
import Theme from './core/providers/Theme.tsx';
import Routes from './core/routing/Routes.tsx';
import { RootTrack } from './core/track/TrackProvider.tsx';
import SplashScreen from './layout/splash-screen/SplashScreen.tsx';
import SplashScreenContent from './layout/splash-screen/SplashScreenContent.tsx';
import AppServiceProvider from './AppServiceProvider.tsx';
import './core/styles/tailwindcss.css';
import './core/styles/reset.css';
import buildProvidersTree from '@/core/providers/buildProvidersTree.tsx';

const Providers = buildProvidersTree([
  [Theme],
  [FeatureProvider],
  [AppServiceProvider],
  [QueryProvider],
  [ToastProvider],
  [SplashScreen],
  [Suspense, { fallback: <SplashScreenContent /> }],
  [I18n],
  [AuthProvider],
  [HelpPathProvider],
  [RootTrack, { appId: 'react-fluent-ui' }],
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <Providers>
    <Routes />
  </Providers>,
);
