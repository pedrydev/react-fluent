import { cloneElement, ReactElement, SyntheticEvent } from 'react';
import { TrackedData, useTrackData } from '@/core/track/TrackProvider.tsx';
import TrackService from '@/core/track/TrackService.ts';
import { useService } from '@/core/providers/ServiceProvider.tsx';

export type TrackEventProps = Omit<TrackedData, 'children'> & {
  children: ReactElement;
  event: string;
}

export default function TrackEvent({ children, event, ...trackData }: TrackEventProps) {
  const parentData = useTrackData();
  const trackService = useService(TrackService);

  const handleEvent = (ev: SyntheticEvent) => {
    trackService.recordEvent(event, { ...parentData, ...trackData });
    if (children?.props[event])
      children.props[event](ev);
  };

  return cloneElement(children, { [event]: handleEvent });
}
