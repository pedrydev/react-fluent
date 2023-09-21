import {
  Button,
  Label,
  Radio,
  RadioGroup,
  RadioGroupProps,
  ToastIntent,
} from '@fluentui/react-components';
import { useEffect, useState } from 'react';
import TrackEvent from '@/core/track/TrackEvent.tsx';
import { useService } from '@/core/providers/ServiceProvider.tsx';
import LoggerService from '@/core/services/LoggerService.ts';
import useToast from '@/core/feedback/useToast.ts';
import JsonPlaceholderTodoService from '@/home/services/JsonPlaceholderTodoService.ts';

export default function HomeIndex() {
  const toast = useToast();
  const service = useService(JsonPlaceholderTodoService);
  const logger = useService(LoggerService);
  const [intent, setIntent] = useState<ToastIntent>('success');

  useEffect(() => {
    service.getOne('1').then(res => {
      logger.logInfo(res);
    });
  }, []);

  const handleRadioChange: RadioGroupProps['onChange'] = (_, data) => {
    setIntent(data.value);
  };

  return (
    <div>
      <div className='mb-2'>
        <Label htmlFor='intent'>Intent</Label>
        <RadioGroup aria-labelledby='intent' onChange={handleRadioChange} value={intent}>
          <div className='flex space-x-3'>
            {['success', 'info', 'warning', 'error'].map(n => (
              <Radio key={n} label={`Option ${n}`} value={n} />
            ))}
          </div>
        </RadioGroup>
      </div>
      <div className='flex space-x-2'>
        <TrackEvent event='onClick' target='snackbarTestButton'>
          <Button
            onClick={() => {
              toast.open('this is a message', intent!);
            }}
          >
            Open toast
          </Button>
        </TrackEvent>
        <Button onClick={toast.close}>Close</Button>
      </div>
    </div>
  );
}
