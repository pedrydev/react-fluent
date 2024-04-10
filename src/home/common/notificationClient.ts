import BaseHttpClient from "@/core/http/BaseHttpClient.ts";

export const notificationClientV1 = new BaseHttpClient({
  url: import.meta.env.VITE_APP_NOTIFICATION_URL
});
