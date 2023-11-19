'use client'

import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const RSVPContext = React.createContext({ rsvp: null, setRSVP: (value: any) => {} });

export const RSVP = ({ children }: { children: React.ReactNode }) => {
  const [rsvp, setRSVP] = React.useState(null);

  return (
    <RSVPContext.Provider value={{ rsvp, setRSVP }}>
      {children}
    </RSVPContext.Provider>
  );
}