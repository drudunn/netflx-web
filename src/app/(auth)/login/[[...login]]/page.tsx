'use client'

import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { SignIn, SignUp, useUser } from '@clerk/nextjs';
import styles from './login.module.css'
import LoginButton from '@/components/login-button'
import { SignUpTheme } from '@clerk/types';
import { CookiesProvider, useCookies } from 'react-cookie';

const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
}

const appearance: SignUpTheme = {
  elements: {
    logoBox: styles.logo,
    card: styles.card,
    formButtonPrimary: 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:text-white dark:hover:bg-red-700',

  },
  variables: {
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  }
}

export default function LoginPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [cookies, setCookie] = useCookies(['token']);
  const hasInvite = cookies.token === 'allowed'

  if (user) {
    // find user in db by id
    redirect('/')
  }

  return (
    <CookiesProvider>
      <section className="container flex min-h-screen w-full max-w-xl flex-col items-center justify-center" suppressHydrationWarning>
        <div className="w-fit rounded-md bg-zinc-800/25 p-14 backdrop-blur-lg">
          <h1 className="mb-8 text-center text-3xl font-bold">Sign in</h1>
          {!hasInvite ? (
              <>
                <p className={'mb-4'}>The invite code in at the bottom of your physical invite</p>
                <LoginButton/>
              </>) :
            (<>
              <p className={'mb-4'}>If this is your first visit, you need to sign up using the link below! We will email a magic link ✨</p>
              <SignUp appearance={appearance}/>
              <SignIn appearance={appearance}/>
            </>)
          }
        </div>
      </section>
    </CookiesProvider>
  )
}
