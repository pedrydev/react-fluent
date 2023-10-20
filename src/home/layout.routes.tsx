import { Outlet } from 'react-router-dom';
import RouteConfig from '@/core/routing/RouteConfig.ts';

const allConfigs = import.meta.glob('./**/routes.tsx', {
  eager: true,
  import: 'default',
});

const children: RouteConfig[] = [];
Object.keys(allConfigs)
  .map(key => allConfigs[key] as RouteConfig[])
  .forEach(configArr =>
    configArr.forEach(config => {
      if (config.parents?.some(parent => parent === 'HomeLayout')) children.push(config);
    }),
  );

const config: RouteConfig = {
  element: <Outlet />,
  name: 'HomeLayout',
  path: '/',
  children,
};
export default config;
