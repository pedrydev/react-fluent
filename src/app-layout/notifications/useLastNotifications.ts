import { useQuery } from "@tanstack/react-query";
import NotificationService from "@/app-layout/notifications/NotificationService.ts";

export default function useLastNotifications() {
  const { data, isLoading } = useQuery({
    queryKey: ["notification", "last"],
    queryFn: NotificationService.getLastNotifications,
    suspense: false
  });
  return { data: data ?? [], isLoading };
}
