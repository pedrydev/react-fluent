import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import useUniqueList from '@/core/form/useUniqueList.ts';
import RecentPageModel from './RecentPageModel.ts';
import RecentPagesFunctionsModel from './RecentPagesFunctionsModel.ts';

const RecentPagesStateContext = createContext<RecentPageModel[]>([]);

const RecentPagesFunctionsContext = createContext<RecentPagesFunctionsModel>(null!);

export function RecentPagesProvider({ children }: PropsWithChildren) {
  const uniqueList = useUniqueList<RecentPageModel>({ comparisonFunction: (a, b) => a.href === b.href });
  const functions = useMemo<RecentPagesFunctionsModel>(() => ({
    add: uniqueList.add,
    remove: uniqueList.remove,
  }), [uniqueList]);

  return (
    <RecentPagesFunctionsContext.Provider value={functions}>
      <RecentPagesStateContext.Provider value={uniqueList.state}>
        {children}
      </RecentPagesStateContext.Provider>
    </RecentPagesFunctionsContext.Provider>
  );
}

export function useRecentPagesFunctions() {
  return useContext(RecentPagesFunctionsContext);
}

export function useRecentPages() {
  return useContext(RecentPagesStateContext);
}
