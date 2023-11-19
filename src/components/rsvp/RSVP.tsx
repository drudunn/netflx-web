import { useUser } from '@clerk/nextjs';
import { useContext, useEffect } from 'react';
import { RSVPContext } from '@/components/RSVPContext';
import { Icons } from '@/components/icons';

export const RSVP = () => {
  const { user } = useUser();
  const { id, publicMetadata, firstName } = user || {};
  const hash = publicMetadata && Object.values(publicMetadata).length

  const { rsvp: rsvpContext } = useContext(RSVPContext)
  const rsvp = rsvpContext || publicMetadata?.['attending']

  useEffect(() => {
    console.log('header', { publicMetadata, user, hash, rsvp, 'rsvpContext': rsvpContext })
  }, [publicMetadata, user, hash, rsvp, rsvpContext])

  const attending = rsvp === 'Yes'
  const nope = rsvp === 'No'
  const awaiting = !rsvp

  const Text = ({ text, small }: { text: string, small: boolean }) => (
    <p
      className={`flex items-center text-sm font-medium text-slate-300 transition hover:text-slate-300 hover:text-opacity-70 dark:text-slate-300 dark:hover:text-slate-300 dark:hover:text-opacity-70 sm:text-sm ${small ? 'text-xs' : ''}`}>{text}</p>
  );

  const iconClass = 'h-4 mt-2.5 lg:mt-1.5 text-red-600'


  return (
    <a href={'/account'} className={'flex space-x-2 align-middle lg:ml-8'} key={rsvp}>
      {attending && (
        <>
          <Icons.check className={iconClass}/>
          <Text text={'Attending'}/>
        </>
      )}
      {nope && (
        <>
          <Icons.warning className={iconClass}/>
          <Text text={`Busy`} small/>
        </>
      )}
      {awaiting && (
        <>
          <Icons.help className={iconClass}/>
          <Text text={'RSVP'}/>
        </>
      )}
    </a>
  )
}