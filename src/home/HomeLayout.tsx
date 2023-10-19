import { Add24Regular, Home24Regular, Table24Regular } from '@fluentui/react-icons';
import { Outlet } from 'react-router-dom';
import MainContent from '@/core/layout/MainContent.tsx';
import NavigationRail from '@/core/navigation/NavigationRail.tsx';
import NavigationRailItem from '@/core/navigation/NavigationRailItem.tsx';
import { ServiceProvider } from '@/core/providers/ServiceProvider.tsx';
import registerHomeServices from './di/registerHomeServices.ts';

export default function HomeLayout() {
  return (
    <ServiceProvider registerServices={registerHomeServices}>
      <div className='flex w-full'>
        <NavigationRail>
          <NavigationRailItem icon={<Home24Regular />} to='/home' tooltip='Home' />
          <NavigationRailItem icon={<Add24Regular />} to='/form' tooltip='Form' />
          <NavigationRailItem icon={<Table24Regular />} to='/table' tooltip='Table' />
        </NavigationRail>
        <MainContent>
          <Outlet />
        </MainContent>
      </div>
    </ServiceProvider>
  );
}
