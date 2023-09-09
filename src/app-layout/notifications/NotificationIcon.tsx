import { Button, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, Spinner } from '@fluentui/react-components';
import { Alert24Regular } from '@fluentui/react-icons';
import { useToggle } from 'ahooks';
import { useEffect } from 'react';
import NotificationsDrawer from '@/app-layout/notifications/NotificationsDrawer.tsx';
import useLastNotifications from '@/app-layout/notifications/useLastNotifications.ts';
import NotificationModel from '@/app-layout/notifications/NotificationModel.ts';
import useUniqueList from '@/core/form/useUniqueList.ts';
import useButtonStyles from '../useButtonStyles.ts';
import Notification from '@/app-layout/notifications/Notification.tsx';
import FloatingBadge from '@/core/display/FloatingBadge.tsx';

export default function NotificationIcon() {
  const { state, setState } = useUniqueList<NotificationModel>({});
  const { data, isLoading } = useLastNotifications();
  const [openMenu, { toggle: toggleMenu }] = useToggle();
  const [openDrawer, { toggle: toggleDrawer }] = useToggle();
  const buttonStyles = useButtonStyles();

  useEffect(() => {
    if (!isLoading) setState(data);
  }, [data, isLoading]);

  if (isLoading) return <Spinner size='tiny' />;

  return (
    <>
      <Menu
        open={openMenu}
        onOpenChange={toggleMenu}
        positioning={{ position: 'below', align: 'end', offset: { mainAxis: 6, crossAxis: 12 } }}
      >
        <FloatingBadge count={state.length}>
          <MenuTrigger disableButtonEnhancement>
            <Button
              appearance='subtle'
              className={buttonStyles.button}
              icon={<Alert24Regular />}
              shape='rounded'
              title='Notifications'
            />
          </MenuTrigger>
        </FloatingBadge>
        <MenuPopover>
          <MenuList className='space-y-2'>
            {state.length === 0 ? (
              <MenuItem>No hay notificaciones nuevas</MenuItem>
            ) : state.reverse().map(n => (
              <Notification key={n.id} model={n} />
            ))}
            <div className='flex justify-center'>
              <Button
                onClick={() => {
                  toggleMenu();
                  toggleDrawer();
                  setState([]);
                }}
              >See all</Button>
            </div>
          </MenuList>
        </MenuPopover>
      </Menu>
      <NotificationsDrawer open={openDrawer} toggle={toggleDrawer} />
    </>
  );
}
