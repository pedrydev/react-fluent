import HttpClient from "@/core/services/HttpClient.ts";

export const notificationClientV1 = new HttpClient({
  url: import.meta.env.VITE_APP_NOTIFICATION_URL
});
