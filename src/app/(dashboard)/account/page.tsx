"use client"

import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { authOptions } from "@/server/auth"
import { prisma } from "@/server/db"
import { FormEvent, Fragment } from 'react'

import { getCurrentUser } from "@/lib/session"
import { stripe } from "@/lib/stripe"
import { getPlanDetails, getUserSubscriptionPlan } from "@/lib/subscription"
import AccountForm from "@/components/forms/account-form"
import { useUser } from '@clerk/nextjs';

type PublicProfile = {
  attending: string
  guests: string
  note: string
  dietary: string
  song: string
}
interface FormOptions { label: string, value: string | string[] }

const profileConfig: { [key: keyof PublicProfile]: FormOptions } = {
  attending: { label: 'Attending', value: ['Yes', 'No'] },
  guests: { label: 'Guests', value: '' },
  note: { label: 'Guest notes (optional)', value: '' },
  dietary: { label: 'Dietary requirements', value: '' },
  song: { label: 'Song recommendation', value: '' },
}

export default function AccountPage() {
  const { user } = useUser();
  const { id, publicMetadata, firstName } = user || {};

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    console.log({ data })
  }

  return (
    <div className={`container flex flex-col max-w-screen-lg justify-between space-x-4 sm:space-x-0 pt-8 pb-24`}>
      <h1>Account</h1>

      <p className={`text-3xl font-bold md:text-4xl`}>Hi {firstName}</p>

      <hr className={`my-4`} />

      <H2>Profile</H2>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={onSubmit} className={'flex flex-col'}>
        {Object.keys(profileConfig).map((key) => {
          const { label, value }: { label: string, value: string | string[]} = profileConfig?.[key]

          const isString = typeof value === 'string'
          const defaultValue = publicMetadata?.[key]
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
                    className={'p-2 rounded mb-6'}
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
                      name={key}
                      className={`flex items-center mb-6 mr-8`}
                    >
                      <input
                        value={option}
                        type={'radio'}
                        name={key}
                        className={`mr-2`}
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
        <button type="submit">Submit</button>
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
