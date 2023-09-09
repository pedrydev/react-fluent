import { PropsWithChildren, useEffect } from 'react';
import { Title3 } from '@fluentui/react-components';
import { useSetHelpPath } from '@/core/help/HelpPathContext.tsx';
import { useTitle } from 'ahooks';

export interface PageProps {
  header: string;
  helpPath: string;
  title: string;
}

export default function Page({ children, helpPath, header, title }: PropsWithChildren<PageProps>) {
  const setHelpPath = useSetHelpPath();
  useTitle(import.meta.env.VITE_APP_NAME + ' - ' + title);

  useEffect(() => {
    setHelpPath(helpPath);
  }, [helpPath]);

  return (
    <div className='flex flex-col space-y-1.5'>
      {header && <Title3 as='h1'>{header}</Title3>}
      <div className='flex-1'>{children}</div>
    </div>
  );
}
