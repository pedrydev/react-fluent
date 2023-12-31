/// <reference types="vite/client" />

import { LogLevel } from '@/core/services/LoggerService.ts';

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  // i18n
  readonly VITE_APP_DEFAULT_LANGUAGE: string;
  readonly VITE_APP_SUPPORTED_LANGUAGES: string;

  // Apis
  readonly VITE_APP_AUTH_URL: string;
  readonly VITE_APP_NOTIFICATION_URL: string;

  // Keycloak
  readonly VITE_APP_KEYCLOAK_CLIENT_ID: string;
  readonly VITE_APP_KEYCLOAK_REALM: string;
  readonly VITE_APP_KEYCLOAK_URL: string;

  // Features
  readonly VITE_APP_FEATURE_TEST: '0' | '1';

  // Services
  readonly VITE_APP_LOG_LEVEL: LogLevel;
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
