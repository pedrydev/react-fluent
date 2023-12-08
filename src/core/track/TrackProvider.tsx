import { createContext, PropsWithChildren, useContext } from 'react';

export interface RootTrackData {
  appId: string;
}

export interface TrackData {
  [key: string]: string | number | boolean;
}

const TrackContext = createContext<TrackData>(null!);

export function RootTrack({ appId, children }: PropsWithChildren<RootTrackData>) {
  return (
    <TrackContext.Provider value={{ appId }}>
      {children}
    </TrackContext.Provider>
  );
}

export function Track({ children, ...trackData }: PropsWithChildren<TrackData>) {
  const parentData = useContext(TrackContext) ?? {};
  const currentData = { ...parentData, ...trackData };

  return (
    <TrackContext.Provider value={currentData}>
      {children}
    </TrackContext.Provider>
  );
}

export function useTrackData() {
  return useContext(TrackContext);
}
