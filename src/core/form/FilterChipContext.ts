import FilterChipModel from "@/core/form/FilterChipModel.ts";
import { createContext } from "react";

export interface FilterChipFunctions {
  update: (model: FilterChipModel) => void;
}

const filterChipContext = createContext<FilterChipFunctions>(null!);

export default filterChipContext;
