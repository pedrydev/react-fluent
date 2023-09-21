import { useQuery } from '@tanstack/react-query';
import NotificationService from './NotificationService';

export default function useAllNotifications(cursor: number) {
  const { data, isLoading } = useQuery({
    queryKey: ['notification', 'all', cursor],
    queryFn: () => NotificationService.getAllNotifications(cursor),
    suspense: false,
  });
  return { data: data ?? [], isLoading };
}
