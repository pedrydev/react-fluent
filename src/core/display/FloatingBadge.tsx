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
      className="top-0 right-0"
      color="danger"
      count={count}
      ref={badgeRef}
      size="small"
      style={{
        position: "absolute",
        transform: "translate(2px, -2px)"
      }}
    />
  </div>
));

export default FloatingBadge;
