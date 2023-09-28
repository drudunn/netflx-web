"use client"

import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { authOptions } from "@/server/auth"
import { prisma } from "@/server/db"
import { FormEvent } from 'react'

import { getCurrentUser } from "@/lib/session"
import { stripe } from "@/lib/stripe"
import { getPlanDetails, getUserSubscriptionPlan } from "@/lib/subscription"
import AccountForm from "@/components/forms/account-form"
import { useUser } from '@clerk/nextjs';

const metadata: Metadata = {
  title: "Account",
  description: "Manage billing and your subscription plan.",
}

export default function AccountPage() {
  const { user } = useUser();
  const { id, publicMetadata } = user || {};

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
    <>
      <h1>Account</h1>
    {/*  {publicMetadata ? <ul>*/}
    {/*    {Object.keys(publicMetadata || {}).map((value, index) => (*/}
    {/*      <li key={index}>{value}: {publicMetadata?.[value]}</li>*/}
    {/*    ))}*/}
    {/*  </ul> : null}*/}

    {/*  <h2>Update Profile</h2>*/}
    {/*  /!* eslint-disable-next-line @typescript-eslint/no-misused-promises *!/*/}
    {/*<form onSubmit={onSubmit}>*/}
    {/*  {Object.keys(publicMetadata || {}).map((value, index) => (*/}
    {/*    <input key={value} type="text" name={value} defaultValue={publicMetadata[value]} style={{ color: "#333" }} />*/}
    {/*  ))}*/}
    {/*  <button type="submit">Submit</button>*/}
    {/*</form>*/}
    </>
  )
}

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
