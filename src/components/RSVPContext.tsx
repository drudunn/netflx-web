'use client'

import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const RSVPContext = React.createContext({ rsvp: null, setRSVP: (value: string) => {} });

export const RSVP = ({ children }) => {
  const [rsvp, setRSVP] = React.useState(null);

  return (
    <RSVPContext.Provider value={{ rsvp, setRSVP }}>
      {children}
    </RSVPContext.Provider>
  );
}