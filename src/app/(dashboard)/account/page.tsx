"use client"

import { FormEvent, Fragment, useContext, useEffect, useState } from 'react'

import { useUser } from '@clerk/nextjs';
import { Icons } from '@/components/icons';
import { RSVPContext } from '@/components/RSVPContext';

type PublicProfile = 'attending' |  'guests' |  'note' |  'dietary' |  'song'

interface FormOptions { label: string, value: string | string[] }

const profileConfig: Record<PublicProfile, FormOptions> = {
  attending: { label: 'Attending', value: ['Yes', 'No'] },
  guests: { label: 'Guests', value: '' },
  note: { label: 'Guest notes (optional)', value: '' },
  dietary: { label: 'Dietary requirements', value: '' },
  song: { label: 'Song recommendation', value: '' },
}

export const RSVP = () => {
  const { user } = useUser();
  const { id, publicMetadata, firstName } = user || {};
  const hash = publicMetadata && Object.values(publicMetadata).length

  const { rsvp: rsvpContext } = useContext(RSVPContext)
  const rsvp = rsvpContext || publicMetadata?.['attending']

  useEffect(() => {
    console.log('header',{ publicMetadata, user, hash, rsvp, 'rsvpContext': rsvpContext })
  }, [publicMetadata, user, hash, rsvp, rsvpContext])

  const attending = rsvp === 'Yes'
  const nope = rsvp === 'No'
  const awaiting = !rsvp

  const Text = ({ text, small }: { text: string, small: boolean }) => (
    <p className={`flex items-center text-sm font-medium text-slate-300 transition hover:text-slate-300 hover:text-opacity-70 dark:text-slate-300 dark:hover:text-slate-300 dark:hover:text-opacity-70 sm:text-sm ${small ? 'text-xs' : ''}`}>{text}</p>
  );

  const iconClass = 'h-4 mt-2.5 lg:mt-1.5 text-red-600'


  return (
    <a href={'/account'} className={'flex space-x-2 align-middle lg:ml-8'} key={rsvp}>
      {attending && (
        <>
          <Icons.check className={iconClass} />
          <Text text={'Attending'} />
        </>
      )}
      {nope && (
        <>
          <Icons.warning className={iconClass} />
          <Text text={`Busy`} small />
        </>
      )}
      {awaiting && (
        <>
          <Icons.help className={iconClass} />
          <Text text={'RSVP'} />
        </>
      )}
    </a>
  )
}

export default function AccountPage() {
  const { user } = useUser();
  const { id, publicMetadata, firstName } = user || {};

  const { rsvp, setRSVP } = useContext(RSVPContext)

  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)

    const formData = new FormData(event.currentTarget)
    console.log({ formData, id })

    const response = await fetch('/api/profile', {
      method: 'POST',
      body: formData,
      headers: {
        userId: id || '',
      }
    })

    // Handle response if necessary
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await response.json()
    const attending = formData.get('attending') || ''
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    console.log({ data, attending })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    setRSVP(attending)
    setSubmitting(false)
  }
  const hash = publicMetadata && Object.values(publicMetadata).length

  useEffect(() => {
    console.log('account',{ publicMetadata, user, hash, rsvp })
  }, [publicMetadata, user, hash, rsvp])

  return (
    <div className={`container flex flex-col max-w-screen-lg justify-between space-x-4 sm:space-x-0 pt-8 pb-24`}>
      <h1>RSVP</h1>

      <p className={`text-3xl font-bold md:text-4xl`}>Hi {firstName}</p>

      <hr className={`my-4 mb-12`} />

      <H2>Wedding Profile</H2>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={onSubmit} className={'flex flex-col'} key={hash}>
        {Object.keys(profileConfig).map((key) => {
          const { label, value }: { label: string, value: string | string[]} = profileConfig?.[key as PublicProfile]

          const isString = typeof value === 'string'
          const defaultValue = publicMetadata?.[key] as string
          console.log({ key, label, value, defaultValue })

          return (
            <Fragment key={label}>
              {isString && (
                <>
                  <label htmlFor={label}>{label}</label>
                  <input
                    id={label}
                    type={'text'}
                    name={key}
                    defaultValue={defaultValue}
                    disabled={submitting}
                    className={'p-2 rounded mb-6 text-slate-800'}
                    style={{ color: '#333!important' }}
                  />
                </>
              )}

              {!isString && (
                  <fieldset className={`flex mt-4`}>
                  <legend>{label}</legend>
                  {value.map((option) => (
                    <label
                      key={option}
                      className={`flex items-center mb-6 mr-8`}
                    >
                      <input
                        value={option}
                        type={'radio'}
                        name={key}
                        className={`mr-2`}
                        disabled={submitting}
                        defaultChecked={defaultValue === option}
                      />
                      {option}
                    </label>
                  ))}
                  </fieldset>
              )}
            </Fragment>
          )
        })}
        <button type="submit" disabled={submitting}>
          {submitting ? 'Updating' : 'Save'}
        </button>
      </form>
    </div>
  )
}

const H1 = ({ children }: { children: React.ReactNode }) => (
  <h1 className={`text-3xl font-bold md:text-4xl`}>{children}</h1>
)

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className={`text-lg font-semibold text-white/90 transition-colors hover:text-white sm:text-xl`}>{children}</h2>
)

// export async function Old() {
//   const user = await getCurrentUser()
//
//   if (!user) {
//     redirect(authOptions?.pages?.signIn ?? "/login")
//   }
//
//   // find subscription plan of user
//   const subscriptionPlan = await getUserSubscriptionPlan(user.id)
//
//   // if user has a subscription plan, check if it's active
//   let subStartDate: number | null = null
//   let isCanceled = false
//   if (subscriptionPlan && subscriptionPlan.stripeSubscriptionId) {
//     const stripePlan = await stripe.subscriptions.retrieve(
//       subscriptionPlan.stripeSubscriptionId
//     )
//
//     subStartDate = stripePlan.start_date * 1000
//     isCanceled = stripePlan.cancel_at_period_end
//   }
//
//   const subPlanDetails = getPlanDetails(subscriptionPlan?.name ?? "")
//
//   // if user has no profiles, redirect to profiles page
//   const profiles = await prisma.profile.findMany({
//     where: {
//       userId: user.id,
//     },
//   })
//
//   if (!profiles.length) {
//     redirect("/profiles")
//   }
//
//   return (
//     <section className="container w-full max-w-3xl pb-16 pt-10">
//       <AccountForm
//         subscriptionPlan={subscriptionPlan}
//         subPlanDetails={subPlanDetails}
//         subStartDate={subStartDate}
//         isCanceled={isCanceled}
//       />
//     </section>
//   )
// }
