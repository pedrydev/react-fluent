import { PropsWithChildren } from "react";
import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground5,
    width: "48px"
  }
});

export default function NavigationRail({ children }: PropsWithChildren) {
  const styles = useStyles();
  return (
    <aside
      className={mergeClasses(
        "h-inherit flex flex-col items-center space-y-1.5 pt-1.5",
        styles.root
      )}
    >
      {children}
    </aside>
  );
}
