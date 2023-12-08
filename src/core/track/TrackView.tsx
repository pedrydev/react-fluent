import { TrackData, useTrackData } from '@/core/track/TrackProvider.tsx';
import { cloneElement, ReactElement, useEffect, useRef } from 'react';
import { useInViewport } from 'ahooks';
import TrackService from '@/core/track/TrackService.ts';
import { useService } from '@/core/providers/ServiceProvider.tsx';

export type TrackViewProps = Omit<TrackData, 'children'> & {
  children: ReactElement;
}

export default function TrackView({ children, ...trackData }: TrackViewProps) {
  const parentData = useTrackData();
  const ref = useRef<Element>(null!);
  const [inViewPort] = useInViewport(ref);
  const service = useService(TrackService);

  useEffect(() => {
    if (inViewPort) {
      service.recordView({ ...parentData, ...trackData });
    }
  }, [inViewPort]);

  return cloneElement(children, { ref });
}
