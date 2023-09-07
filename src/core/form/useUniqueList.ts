import { useState } from "react";

const defaultComparisonFunction = <T>(a: T, b: T) => {
  if (a !== null && b !== null) {
    if (typeof a === "object" && typeof b === "object") {
      if (Object.keys(a).some(k => k === "id") && Object.keys(b).some(k => k === "id")) {
        // @ts-ignore
        return a.id === b.id;
      } else if (Object.keys(a).some(k => k === "_id") && Object.keys(b).some(k => k === "_id")) {
        // @ts-ignore
        return a._id === b._id;
      }
    }
  }
  return a === b;
};

export interface UseUniqueListArgs<T> {
  comparisonFunction?: (a: T, b: T) => boolean;
  initSelected?: T[];
}

export default function useUniqueList<T>({
                                           initSelected = [],
                                           comparisonFunction = defaultComparisonFunction
                                         }: UseUniqueListArgs<T>) {
  const [state, setState] = useState<T[]>(initSelected);

  const add = (obj: T) => {
    if (!state.some(item => comparisonFunction(obj, item))) setState([...state, obj]);
  };

  const addOrRemove = (obj: T) => {
    const withoutNew = state.filter(item => !comparisonFunction(item, obj));
    if (withoutNew.length === state.length) setState([...withoutNew, obj]);
    else setState(withoutNew);
  };

  const addOrRemoveMany = (objs: T[]) => {
    const withoutNew = state.filter(item => objs.some(obj => !comparisonFunction(item, obj)));
    setState([...withoutNew, ...objs]);
  };

  const remove = (obj: T) => setState(state.filter(item => !comparisonFunction(item, obj)));

  const removeMany = (objs: T[]) =>
    setState(state.filter(item => !objs.some(obj => comparisonFunction(item, obj))));

  const update = (obj: T) => {
    const index = state.findIndex(item => comparisonFunction(item, obj));
    if (index > -1) setState([...state.slice(0, index), obj, ...state.slice(index + 1)]);
  };

  return {
    add,
    addOrRemove,
    addOrRemoveMany,
    state,
    setState,
    remove,
    removeMany,
    update
  };
}
