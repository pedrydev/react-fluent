import { Button, makeStyles, MenuItem, MenuList, mergeClasses, tokens } from "@fluentui/react-components";
import { Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle } from "@fluentui/react-components/unstable";
import { GridDots24Filled, Home24Regular } from "@fluentui/react-icons";
import { useToggle } from "ahooks";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    ":hover": {
      backgroundColor: tokens.colorBrandBackgroundHover
    }
  },
  icon: {
    color: tokens.colorNeutralBackground1,
    ":hover": {
      color: tokens.colorBrandBackground2
    }
  }
});

export default function AppIcon() {
  const styles = useStyles();
  const [open, { toggle, setLeft }] = useToggle();

  return (
    <>
      <div
        className={mergeClasses("flex items-center justify-center w-12 h-12 hover:cursor-pointer", styles.root)}
        onClick={toggle}
        role="button"
        title="Applications"
      >
        <Button
          appearance="transparent"
          className={styles.icon}
          icon={<GridDots24Filled />}
          shape="circular"
        />
      </div>
      <Drawer separator type="overlay" open={open} onOpenChange={setLeft}>
        <DrawerHeader>
          <DrawerHeaderTitle>
            Modules
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <MenuList>
            <Link to="/home">
              <MenuItem icon={<Home24Regular />} onClick={setLeft}>Home</MenuItem>
            </Link>
          </MenuList>
        </DrawerBody>
      </Drawer>
    </>
  );
}
