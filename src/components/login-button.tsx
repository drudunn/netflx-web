'use client'

import { FormEventHandler, useState } from 'react'
import { toast } from 'react-hot-toast'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { useCookies } from 'react-cookie';

const LoginButton = () => {
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [cookies, setCookie] = useCookies(['token']);

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const checkInvite: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch('/api/invite', {
        method: 'POST',
        body: JSON.stringify({
          password
        })
      })
      if (res.status === 200) {
        setCookie('token', 'allowed', { path: '/' })
        toast.success('Invite code accepted')
      } else {
        throw new Error('Invalid invite code')
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Something went wrong'
      )
    } finally {
      setTimeout(() => setIsLoading(false), 2500)
    }
  }

  return (
    <form onSubmit={checkInvite} method={`post`} className={`flex flex-col gap-3 text-neutral-100`}>
      <fieldset className={`w-full flex flex-col gap-1`}>
        <label htmlFor={'invite'} className={`text-sm sm:text-base`}>Invite Code</label>
        <input id={'invite'} className={`text-slate-900 rounded p-2`} type={'password'} name={'password'}
               value={password}
               onChange={e => setPassword(e.target.value)}/>
      </fieldset>
      <Button
        variant="brand"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner
            className="mr-2 h-4 w-4 animate-spin"
            aria-hidden="true"
          />
        ) : (
          null
        )}
        Submit
      </Button>
    </form>
  )
}

export default LoginButton
