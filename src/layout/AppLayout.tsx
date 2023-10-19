import { makeStyles, mergeClasses, Spinner, tokens } from '@fluentui/react-components';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';

const useStyles = makeStyles({
  main: {
    backgroundColor: tokens.colorNeutralBackground2,
  },
});

export default function AppLayout() {
  const styles = useStyles();

  return (
    <div className='min-h-screen flex flex-col'>
      <AppHeader />
      <div style={{ height: '48px' }} />
      <main className={mergeClasses('flex flex-1', styles.main)}>
        <Suspense
          fallback={
            <div className='flex justify-center pt-4 w-full'>
              <div>
                <Spinner appearance='primary' label='Loading' labelPosition='below' size='medium' />
              </div>
            </div>
          }
        >
          <main className='flex-1 px-4 py-2'>
            <Suspense
              fallback={
                <div className='flex justify-center'>
                  <Spinner appearance='primary' label='Loading' labelPosition='below' size='medium' />
                </div>
              }
            >
              <section className='flex w-full'>
                <Outlet />
              </section>
            </Suspense>
          </main>
        </Suspense>
      </main>
    </div>
  );
}
