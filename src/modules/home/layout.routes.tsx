import RouteConfig from "@/core/routing/RouteConfig.ts";
import { lazy } from "react";

const allConfigs = import.meta.glob("../../**/routes.tsx", {
  eager: true,
  import: "default"
});

const children: RouteConfig[] = [];
Object.keys(allConfigs)
  .map(key => allConfigs[key] as RouteConfig[])
  .forEach(configArr =>
    configArr.forEach(config => {
      if (config.parents?.some(parent => parent === "HomeLayout")) children.push(config);
    })
  );

const Layout = lazy(() => import("./HomeLayout"));

const config: RouteConfig = {
  element: <Layout />,
  name: "HomeLayout",
  path: "/",
  children
};
export default config;
