import { createContext, useState } from 'react';

// create Music Video context
export const MusicVideoContext = createContext();

export const MusicVideoProvider = ({ children }) => {
  const [video, setVideo] = useState({
    canBePlayed: null,
    link: '',
    prevCurrentTime: 0,
    songId: 0,
    slug: '',
    songTitle: '',
    sameSong: false,
  });
  const value = { video, setVideo };
  return (
    <MusicVideoContext.Provider value={value}>
      {children}
    </MusicVideoContext.Provider>
  );
};
