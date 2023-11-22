import type {CategorizedShows, Show} from '@/types'
import {getCurrentUser} from '@/lib/session'
import Hero from '@/components/hero'
import ShowsContainer from '@/components/shows-container'
import {ourShows, trendingShows} from '@/app/(shows)/shows';
import {highlights} from '@/app/(shows)/travel';
import * as React from 'react';
import { KeyLinks } from "@/components/rsvp/KeyLinks";

export default async function Home() {
  const user = await getCurrentUser()

  const shows = ourShows as unknown as Show[]
  const favorites = shows.slice(0, 6)
  const topPicks = shows.slice(6)

  const allShows = [...shows, ...highlights, ...trendingShows] as unknown as Show[]

  const allShowsByCategory: CategorizedShows[] = [
    {
      title: `Andru & Christina's Favorites`,
      shows: favorites,
    },
    {
      title: 'Andru & Christina\'s Travel Highlights',
      shows: highlights as unknown as Show[],
    },
  ]

  const customShowsByCategory: CategorizedShows[] = [
    {
      title: `Andru & Christina's Top Picks`,
      shows: topPicks,
    },
    {
      title: "Dunnflix Trending Now",
      shows: trendingShows as unknown as Show[],
    },
  ]

  return (
    <section>
      <div className="pb-16 pt-10">
        <Hero shows={allShows ?? []}/>
        <ShowsContainer user={user} shows={allShowsByCategory}/>
        <KeyLinks />
        <ShowsContainer user={user} shows={customShowsByCategory}/>
      </div>
    </section>
  )
}
