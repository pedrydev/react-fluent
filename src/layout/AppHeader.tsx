import {
  Avatar,
  makeStyles,
  Menu,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  mergeClasses,
  Subtitle2,
  tokens,
} from '@fluentui/react-components';
import { SignOut24Regular } from '@fluentui/react-icons';
import { useAuth } from '@/core/auth/contexts/AuthProvider.tsx';
import NotificationIcon from './notifications/NotificationIcon.tsx';
import AppIcon from './AppIcon.tsx';
import HelpIcon from './HelpIcon.tsx';
import LanguageSwitch from './LanguageSwitch.tsx';

const useStyles = makeStyles({
  header: {
    backgroundColor: tokens.colorBrandBackground,
  },
  text: {
    color: tokens.colorNeutralBackground1,
  },
});

export default function AppHeader() {
  const styles = useStyles();
  const { logout, user } = useAuth();

  return (
    <header
      className={mergeClasses('h-12 flex items-center fixed top-0 left-0 right-0', styles.header)}
    >
      <AppIcon />
      <div className='ml-1.5 flex flex-1 items-center justify-between h-full'>
        <Subtitle2 className={styles.text}>{import.meta.env.VITE_APP_NAME}</Subtitle2>
        <nav className='flex space-x-2'>
          <NotificationIcon />
          <HelpIcon />
          <LanguageSwitch />
        </nav>
      </div>
      <div className='h-12 w-12 flex items-center justify-center'>
        <Menu positioning={{ position: 'below', align: 'end', offset: { mainAxis: 6 } }}>
          <MenuTrigger disableButtonEnhancement>
            <Avatar
              className='hover:cursor-pointer'
              name={`${user.username} image profile}`}
              image={{ src: user.profileUrl }}
            />
          </MenuTrigger>
          <MenuPopover>
            <div className='flex justify-center'>
              <Subtitle2>{user.username}</Subtitle2>
            </div>
            <MenuDivider />
            <MenuList>
              <MenuItem icon={<SignOut24Regular />} onClick={logout}>
                Sign out
              </MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    </header>
  );
}
