import { lazy } from 'react';
import RouteConfig from '@/core/routing/RouteConfig';
import { RequirePermissions } from '@/core/auth/components/RequirePermissions';
import AppPermissions from '@/core/auth/models/AppPermissions';
import Notifications from './Notifications';
import Page from '@/core/layout/Page';

const FormExample = lazy(() => import('./FormExample'));
const Index = lazy(() => import('./Index'));
const TableExample = lazy(() => import('./TableExample'));

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
    element: <TableExample />,
    path: 'table',
    parents: ['HomeLayout'],
  },
];

export default configs;
