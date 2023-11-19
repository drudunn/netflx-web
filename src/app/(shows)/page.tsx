import type { CategorizedShows, Show } from '@/types'

import { getShows } from '@/lib/fetchers'
import { getCurrentUser } from '@/lib/session'
import Hero from '@/components/hero'
import ShowsContainer from '@/components/shows-container'
import { ourShows } from '@/app/(shows)/shows';
import { cn } from '@/lib/utils';
import { Link } from '@/components/ui/link';
import * as React from 'react';

export default async function Home() {
  const user = await getCurrentUser()

  const shows = ourShows as unknown as Show[]
  const favorites = shows.slice(0, 6)
  const topPicks = shows.slice(6)

  const allShows = await getShows('movie')

  const allShowsByCategory: CategorizedShows[] = [
    {
      title: `Andru & Christina's Favorites`,
      shows: favorites,
    },
    {
      title: `Andru & Christina's Top Picks`,
      shows: topPicks,
    }
  ]

  const customShowsByCategory: CategorizedShows[] = [
    {
      title: 'Travel Highlights',
      shows: allShows.docs,
    },
    {
      title: "The Ultimate Best Man",
      shows: allShows.comedy,
    },
  ]

  return (
    <section>
      <div className="pb-16 pt-10">
        <Hero shows={shows ?? []}/>
        <ShowsContainer user={user} shows={allShowsByCategory}/>
        <div className={cn("w-full space-y-5 sm:space-y-10 pt-16")}>
          <div className="container w-full max-w-screen-2xl space-y-1 sm:space-y-2.5">
            <h2 className="text-lg font-semibold text-white/90 transition-colors hover:text-white sm:text-xl">
              {'Key Links'}
            </h2>
            <div className="group relative">
          <div className={'flex space-x-4'}>
            <Link href="/account" variant={'brand'}>RSVP</Link>
            <Link href="/schedule">Schedule</Link>
            <Link href="/venue">Venue</Link>
            <Link href="/faqs">FAQs</Link>
          </div>
        </div>
        </div>
        </div>
        <ShowsContainer user={user} shows={customShowsByCategory}/>
      </div>
    </section>
  )
}
