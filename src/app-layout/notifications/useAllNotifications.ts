import { useQuery } from "@tanstack/react-query";
import NotificationService from "@/app-layout/notifications/NotificationService.ts";

export default function useAllNotifications(cursor: number) {
  const { data, isLoading } = useQuery({
    queryKey: ["notification", "all", cursor],
    queryFn: () => NotificationService.getAllNotifications(cursor),
    suspense: false
  });
  return { data: data ?? [], isLoading };
}
