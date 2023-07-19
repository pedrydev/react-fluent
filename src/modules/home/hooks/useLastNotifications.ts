import { useQuery } from "@tanstack/react-query";

export default function useLastNotifications() {
  const { data, isLoading } = useQuery({
    queryKey: ["notification", "last"],
    queryFn: () => Promise.resolve([]),
    suspense: false
  });
  return { data: data ?? [], isLoading };
}
