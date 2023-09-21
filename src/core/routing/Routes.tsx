import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from '@/core/routing/NotFound.tsx';
import RouteConfig from '@/core/routing/RouteConfig.ts';
import RouteError from '@/core/routing/RouteError.tsx';
import AppLayout from '@/layout/AppLayout.tsx';

function findParent(routes: RouteConfig[], parent: string) {
  const queue: RouteConfig[] = [...routes];
  while (queue.length > 0) {
    const config = queue.shift();
    if (config?.name === parent) return config;
  }
  return undefined;
}

const layoutConfigs = import.meta.glob('../../**/layout.routes.tsx', {
  eager: true,
  import: 'default',
});

const routes: RouteConfig[] = [];
Object.keys(layoutConfigs)
  .sort((k1, k2) => k1.length - k2.length)
  .forEach(key => {
    const layoutConfig = layoutConfigs[key] as RouteConfig;
    layoutConfig.children?.push({
      element: <NotFound />,
      path: '*',
    });
    layoutConfig.parents?.forEach(parent => {
      const parentConfig = findParent(routes, parent);
      if (parentConfig) parentConfig.children?.push(layoutConfig);
      else
        throw {
          message: 'Parent not found',
          current: layoutConfig,
        };
    });
    routes.push({ ...layoutConfig, errorElement: <RouteError /> });
  });
routes.push({
  element: <NotFound />,
  path: '*',
});

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    path: '',
    children: routes,
    errorElement: <RouteError />,
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
