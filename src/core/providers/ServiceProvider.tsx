import { createContext, PropsWithChildren, useContext } from "react";
import { DependencyContainer, InjectionToken } from "tsyringe";
import rootContainer from "@/core/di/rootContainer.ts";

export interface ServiceProviderProps {
  registerServices: (container: DependencyContainer) => void;
}

const ServiceProviderContext = createContext<DependencyContainer>(null!);

export function RootServiceProvider({ children }: PropsWithChildren) {

  return (
    <ServiceProviderContext.Provider value={rootContainer}>
      {children}
    </ServiceProviderContext.Provider>
  );
}

export function ServiceProvider({ children, registerServices }: PropsWithChildren<ServiceProviderProps>) {
  const parentContainer = useContext(ServiceProviderContext);
  const moduleContainer = parentContainer.createChildContainer();
  registerServices(moduleContainer);

  return (
    <ServiceProviderContext.Provider value={moduleContainer}>
      {children}
    </ServiceProviderContext.Provider>
  );
}

export function useService<T>(token: InjectionToken<T>) {
  const container = useContext(ServiceProviderContext);
  return container.resolve<T>(token);
}
