import { Spinner } from '@fluentui/react-components';

export default function SplashScreenContent() {
  return (
    <div
      className='absolute top-0 bottom-0 left-0 right-0 bg-slate-900 flex items-center justify-center'>
      <Spinner size='huge' />
    </div>
  );
}
