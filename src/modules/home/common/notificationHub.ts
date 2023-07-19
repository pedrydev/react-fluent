import * as signarR from '@microsoft/signalr';

const notificationHub = new signarR.HubConnectionBuilder()
  .withUrl(import.meta.env.VITE_APP_NOTIFICATION_URL)
  .withAutomaticReconnect()
  .configureLogging(signarR.LogLevel.Information)
  .build();

export default notificationHub;
