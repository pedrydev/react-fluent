import { forwardRef, PropsWithChildren, Ref } from "react";
import { CounterBadge } from "@fluentui/react-components";

export interface FloatingBadgeProps {
  badgeRef?: Ref<HTMLDivElement>;
  count: number;
}

const FloatingBadge = forwardRef<HTMLDivElement, PropsWithChildren<FloatingBadgeProps>>((
  {
    badgeRef,
    children,
    count
  },
  ref
) => (
  <div className="relative" ref={ref}>
    {children}
    <CounterBadge
      appearance="filled"
      className="-top-3 right-2 absolute"
      color="danger"
      count={count}
      ref={badgeRef}
      size="small"
    />
  </div>
));

export default FloatingBadge;
