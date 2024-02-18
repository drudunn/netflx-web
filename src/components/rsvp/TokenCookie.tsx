"use client";

import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

const TokenCookie = () => {
  const [cookies, setCookie] = useCookies(['token']);

  useEffect(() => {
    setCookie('token', 'allowed', { path: '/' })
  });

  return null;
}

export { TokenCookie }