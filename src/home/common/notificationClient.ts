import BaseHttpClient from "@/core/services/BaseHttpClient.ts";

export const notificationClientV1 = new BaseHttpClient({
  url: import.meta.env.VITE_APP_NOTIFICATION_URL
});
