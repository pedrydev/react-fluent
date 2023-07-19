import { Link, To, useLocation } from "react-router-dom";
import { Button, tokens } from "@fluentui/react-components";
import { CSSProperties, ReactNode } from "react";

export interface NavigationRailItemProps {
  icon: ReactNode;
  to: To;
  tooltip: string;
}

export default function NavigationRailItem({ icon, to, tooltip }: NavigationRailItemProps) {
  const location = useLocation();

  const style: CSSProperties = {};
  if (typeof to === "string") {
    if (location.pathname.startsWith(to)) {
      style.backgroundColor = tokens.colorNeutralBackground1;
      style.borderColor = tokens.colorBrandBackground;
      style.borderWidth = "1px";
      style.color = tokens.colorBrandBackground;
    }
  } else if (location.pathname.startsWith(to.pathname as string)) {
    style.borderColor = tokens.colorBrandBackground;
    style.borderWidth = "1px";
  }

  return (
    <Link to={to}>
      <Button appearance="subtle" icon={icon} style={style} title={tooltip} />
    </Link>
  );
}
