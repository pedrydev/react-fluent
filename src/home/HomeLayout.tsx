import { Outlet } from 'react-router-dom';
import { ServiceProvider } from '@/core/providers/ServiceProvider.tsx';
import registerHomeServices from './di/registerHomeServices.ts';

export default function HomeLayout() {
  return (
    <ServiceProvider registerServices={registerHomeServices}>
      <Outlet />
    </ServiceProvider>
  );
}
