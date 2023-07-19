import HttpClient from "@/core/services/HttpClient.ts";

export const authClientV1 = new HttpClient({
  url: import.meta.env.VITE_APP_AUTH_URL
});
