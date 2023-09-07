import { useContext } from "react";
import { FilterChipFunctionsContexts } from "@/core/filters/FilterChipContexts.ts";

export default function useFilterChipFunctions() {
  return useContext(FilterChipFunctionsContexts);
}
