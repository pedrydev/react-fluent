import useUniqueList from "@/core/form/useUniqueList.ts";
import FilterChipModel from "@/core/filters/FilterChipModel.ts";

export default function useFilterChips() {
  const {
    state,
    add,
    setState,
    remove,
    update
  } = useUniqueList<FilterChipModel>({ comparisonFunction: (a, b) => a.key === b.key });
  return { filterChips: state, setFilterChips: setState, add, remove, update };
}
