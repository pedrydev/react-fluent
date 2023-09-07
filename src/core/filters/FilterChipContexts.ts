import FilterChipModel from "@/core/filters/FilterChipModel.ts";
import { createContext } from "react";

export interface FilterChipFunctions {
  update: (model: FilterChipModel) => void;
}

export const CurrentFilterChipContext = createContext<FilterChipModel>(null!);

export const FilterChipFunctionsContexts = createContext<FilterChipFunctions>(null!);
