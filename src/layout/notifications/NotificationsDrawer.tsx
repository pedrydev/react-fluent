import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
  Spinner,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';
import { memo, useState } from 'react';
import Notification from './Notification';
import useAllNotifications from './useAllNotifications';

export interface NotificationsDrawerProps {
  open: boolean;
  toggle: () => void;
}

function NotificationsDrawer({ open, toggle }: NotificationsDrawerProps) {
  const [cursor, setCursor] = useState(1);
  const { data, isLoading } = useAllNotifications(cursor);

  return (
    <Drawer type='overlay' onOpenChange={toggle} open={open} position='end' separator>
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance='subtle'
              icon={<Dismiss24Regular />}
              shape='circular'
              onClick={toggle}
            />
          }
        >
          Notifications
        </DrawerHeaderTitle>
      </DrawerHeader>
      <DrawerBody>
        {isLoading ? (
          <div className='flex justify-center'>
            <Spinner
              appearance='primary'
              label='Loading notifications'
              labelPosition='below'
              size='medium'
            />
          </div>
        ) : (
          <div className='flex flex-col space-y-3'>
            <div className='flex-1 space-y-3'>
              {data.map(n => (
                <Notification key={n.id} model={n} />
              ))}
            </div>
          </div>
        )}
      </DrawerBody>
      <DrawerFooter>
        <Button disabled={cursor === 1} onClick={() => setCursor(c => c - 1)}>
          Anterior
        </Button>
        <Button onClick={() => setCursor(c => c + 1)}>Siguiente</Button>
      </DrawerFooter>
    </Drawer>
  );
}

export default memo(NotificationsDrawer);
