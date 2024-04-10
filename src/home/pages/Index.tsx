import { Button, Label, Radio, RadioGroup, RadioGroupProps, ToastIntent } from '@fluentui/react-components';
import { useState } from 'react';
import TrackEvent from '@/core/track/TrackEvent.tsx';
import useToast from '@/core/feedback/useToast.ts';
import { useFeatures } from '@/core/providers/FeatureProvider.tsx';

export default function HomeIndex() {
  const toast = useToast();
  const [intent, setIntent] = useState<ToastIntent>('success');
  const features = useFeatures();

  const handleRadioChange: RadioGroupProps['onChange'] = (_, data) => {
    setIntent(data.value as ToastIntent);
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
            disabled={!features.test}
            onClick={() => {
              toast.open('this is a message', intent!);
            }}
          >
            {features.test ? 'Click' : 'Enable \'test\' feature'}
          </Button>
        </TrackEvent>
        <Button onClick={toast.close}>Close</Button>
      </div>
    </div>
  );
}
