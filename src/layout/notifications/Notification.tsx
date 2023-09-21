import { Body1, Caption1 } from '@fluentui/react-components';
import NotificationModel from './NotificationModel';

export interface NotificationProps {
  model: NotificationModel;
}

export default function Notification({ model }: NotificationProps) {
  return (
    <div className='flex flex-col'>
      <Body1>{model.message}</Body1>
      <Caption1>
        {model.date.toLocaleTimeString()} - {model.date.toLocaleDateString()}
      </Caption1>
    </div>
  );
}
