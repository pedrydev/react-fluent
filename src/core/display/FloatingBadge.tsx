import { forwardRef, PropsWithChildren, Ref } from "react";
import { CounterBadge, makeStyles } from "@fluentui/react-components";

export interface FloatingBadgeProps {
  badgeRef?: Ref<HTMLDivElement>;
  count: number;
}

const useStyles = makeStyles({
  badge: {
    position: "absolute",
    right: "-2.5px",
    top: "-5px"
  }
});

const FloatingBadge = forwardRef<HTMLDivElement, PropsWithChildren<FloatingBadgeProps>>((
  {
    badgeRef,
    children,
    count
  },
  ref
) => {
  const styles = useStyles();

  return (
    <div className="relative" ref={ref}>
      {children}
      <CounterBadge
        appearance="filled"
        className={styles.badge}
        color="danger"
        count={count}
        ref={badgeRef}
        size="small"
      />
    </div>
  );
});

export default FloatingBadge;
