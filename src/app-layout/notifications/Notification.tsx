import NotificationModel from "@/app-layout/notifications/NotificationModel.ts";
import { Body1, Caption1, makeStyles, mergeClasses } from "@fluentui/react-components";

export interface NotificationProps {
  model: NotificationModel;
}

const useStyles = makeStyles({
  root: {}
});

export default function Notification({ model }: NotificationProps) {
  const styles = useStyles();
  return (
    <div className={mergeClasses("flex flex-col", styles.root)}>
      <Body1>{model.message}</Body1>
      <Caption1>{model.date.toLocaleTimeString()} - {model.date.toLocaleDateString()}</Caption1>
    </div>
  );
}
