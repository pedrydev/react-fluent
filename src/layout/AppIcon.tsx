import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  makeStyles,
  MenuGroup,
  MenuGroupHeader,
  MenuItem,
  MenuList,
  mergeClasses,
  Subtitle1,
  tokens,
} from '@fluentui/react-components';
import { AddRegular, DismissRegular, GridDotsFilled, HomeRegular, TableRegular } from '@fluentui/react-icons';
import { useToggle } from 'ahooks';
import { Link } from 'react-router-dom';
import RecentPageModel from '@/layout/recent-pages/RecentPageModel.ts';
import { useRecentPagesFunctions } from '@/layout/recent-pages/RecentPagesContext.tsx';

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

  const { add } = useRecentPagesFunctions();

  const handleClick = (model: RecentPageModel) => {
    add(model);
    setLeft();
  };

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
          icon={<GridDotsFilled />}
          shape='circular'
        />
      </div>
      <Drawer separator type='overlay' open={open} onOpenChange={setLeft}>
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance='subtle'
                icon={<DismissRegular />}
                shape='circular'
                onClick={setLeft}
              />
            }
          >
            <div className='inline-flex items-center space-x-2'>
              <GridDotsFilled />
              <Subtitle1>Modules</Subtitle1>
            </div>
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <MenuList>
            <MenuGroup>
              <MenuGroupHeader>Home</MenuGroupHeader>
              <Link to='/home'>
                <MenuItem
                  icon={<HomeRegular />}
                  onClick={() => handleClick({ href: '/home', icon: <HomeRegular />, label: 'Home' })}
                >
                  Home
                </MenuItem>
              </Link>
              <Link to='/form'>
                <MenuItem
                  icon={<AddRegular />}
                  onClick={() => handleClick({ href: '/form', icon: <AddRegular />, label: 'Form' })}
                >
                  Form
                </MenuItem>
              </Link>
              <Link to='/table'>
                <MenuItem
                  icon={<TableRegular />}
                  onClick={() => handleClick({ href: '/table', icon: <TableRegular />, label: 'Table' })}
                >
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
