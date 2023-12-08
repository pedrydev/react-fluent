import { container } from 'tsyringe';
import LoggerService from '@/core/services/LoggerService.ts';
import TrackService from '@/core/track/TrackService.ts';
import OidcService from '@/core/auth/services/OidcService.ts';
import KeycloakService from '@/core/auth/services/KeycloakService.ts';

const level = import.meta.env.VITE_APP_LOG_LEVEL;
const logger = new LoggerService(level);

const rootContainer = container.createChildContainer()
  .registerInstance(LoggerService, logger)
  .registerSingleton<TrackService>(TrackService)
  .registerInstance(OidcService, new KeycloakService());

export default rootContainer;
