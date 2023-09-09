import { lazy } from 'react';
import RouteConfig from '@/core/routing/RouteConfig.ts';
import { RequirePermissions } from '@/core/auth/components/RequirePermissions.tsx';
import AppPermissions from '@/core/auth/models/AppPermissions.ts';
import Notifications from './Notifications.tsx';
import Page from '@/core/layout/Page.tsx';

const FormExample = lazy(() => import('./FormExample'));
const Charts = lazy(() => import('./Charts'));
const Index = lazy(() => import('./Index'));
const TableExample = lazy(() => import('@/modules/home/pages/TableExample.tsx'));

const configs: RouteConfig[] = [
  {
    element: (
      <Page header='Notifications' helpPath='notifications' title='Notifications'>
        <Notifications />
      </Page>
    ),
    index: true,
    parents: ['HomeLayout'],
  },
  {
    element: (
      <Page header='Form example' helpPath='form' title='Form'>
        <FormExample />
      </Page>
    ),
    path: 'form',
    parents: ['HomeLayout'],
  },
  {
    element: (
      <RequirePermissions permissions={[AppPermissions.HomeIndex]}>
        <Page header='Home' helpPath='home' title='Home'>
          <Index />
        </Page>
      </RequirePermissions>
    ),
    path: 'home',
    parents: ['HomeLayout'],
  },
  {
    element: (
      <Page header='Chart' helpPath='chart' title='Chart'>
        <Charts />
      </Page>
    ),
    path: 'chart',
    parents: ['HomeLayout'],
  },
  {
    element: <TableExample />,
    path: 'table',
    parents: ['HomeLayout'],
  },
];

export default configs;
