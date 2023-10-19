import {
  Button,
  makeStyles,
  MenuGroup,
  MenuGroupHeader,
  MenuItem,
  MenuList,
  mergeClasses,
  tokens,
} from '@fluentui/react-components';
import { Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle } from '@fluentui/react-components/unstable';
import { Add24Regular, GridDots24Filled, Home24Regular, Table24Regular } from '@fluentui/react-icons';
import { useToggle } from 'ahooks';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    ':hover': {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
  },
  icon: {
    color: tokens.colorNeutralBackground1,
    ':hover': {
      color: tokens.colorBrandBackground2,
    },
  },
});

export default function AppIcon() {
  const styles = useStyles();
  const [open, { toggle, setLeft }] = useToggle();

  return (
    <>
      <div
        className={mergeClasses(
          'flex items-center justify-center w-12 h-12 hover:cursor-pointer',
          styles.root,
        )}
        onClick={toggle}
        role='button'
        title='Applications'
      >
        <Button
          appearance='transparent'
          className={styles.icon}
          icon={<GridDots24Filled />}
          shape='circular'
        />
      </div>
      <Drawer separator type='overlay' open={open} onOpenChange={setLeft}>
        <DrawerHeader>
          <DrawerHeaderTitle>Modules</DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <MenuList>
            <MenuGroup>
              <MenuGroupHeader>Home</MenuGroupHeader>
              <Link to='/home'>
                <MenuItem icon={<Home24Regular />} onClick={setLeft}>
                  Home
                </MenuItem>
              </Link>
              <Link to='/form'>
                <MenuItem icon={<Add24Regular />} onClick={setLeft}>
                  Form
                </MenuItem>
              </Link>
              <Link to='/table'>
                <MenuItem icon={<Table24Regular />} onClick={setLeft}>
                  Table
                </MenuItem>
              </Link>
            </MenuGroup>
          </MenuList>
        </DrawerBody>
      </Drawer>
    </>
  );
}
