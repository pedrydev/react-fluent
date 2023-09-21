import { useQuery } from '@tanstack/react-query';
import NotificationService from './NotificationService';

export default function useLastNotifications() {
  const { data, isLoading } = useQuery({
    queryKey: ['notification', 'last'],
    queryFn: NotificationService.getLastNotifications,
    suspense: false,
  });
  return { data: data ?? [], isLoading };
}
