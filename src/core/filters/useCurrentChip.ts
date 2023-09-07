import { useContext } from "react";
import { CurrentFilterChipContext } from "@/core/filters/FilterChipContexts.ts";

export default function useCurrentChip() {
  return useContext(CurrentFilterChipContext);
}
