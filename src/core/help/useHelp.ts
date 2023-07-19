import { useHelpPath } from "@/core/help/HelpPathContext.tsx";
import { useQuery } from "@tanstack/react-query";
import HelpService from "@/core/help/HelpService.ts";

export default function useHelp() {
  const path = useHelpPath();
  const { data, isLoading } = useQuery({
    queryKey: ["help", path],
    queryFn: () => HelpService.get(path),
    suspense: false
  });
  return { data, isLoading };
}
