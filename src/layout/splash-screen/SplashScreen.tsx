import { Transition } from '@headlessui/react';
import { useIsFetching } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import SplashScreenContent from './SplashScreenContent.tsx';

export default function SplashScreen({ children }: PropsWithChildren) {
  const isFetching = useIsFetching(undefined, { fetchStatus: 'fetching' });

  return (
    <>
      {children}
      <Transition
        key='app-splash-screen'
        show={isFetching > 0}
        enter='transition-opacity duration-75'
        enterFrom='opacity-0'
        enterTo='opacity-25'
        leave='transition-opacity duration-150'
        leaveFrom='opacity-25'
        leaveTo='opacity-0'
      >
        <SplashScreenContent />
      </Transition>
    </>
  );
}
