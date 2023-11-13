import type { CategorizedShows, Show } from '@/types'

import { getShows } from '@/lib/fetchers'
import { getCurrentUser } from '@/lib/session'
import Hero from '@/components/hero'
import ShowsContainer from '@/components/shows-container'
import { ourShows } from '@/app/(shows)/shows';

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
    },
    {
      title: 'Travel Highlights',
      shows: allShows.docs,
    },
    {
      title: "The Ultimate Best Man",
      shows: allShows.comedy,
    },
    // {
    //   title: "Scary Movies",
    //   shows: allShows.horror,
    // },
    // {
    //   title: "Romance Movies",
    //   shows: allShows.romance,
    // },
    // {
    //   title: "Documentaries",
    //   shows: allShows.docs,
    // },
  ]

  return (
    <section>
      <div className="pb-16 pt-10">
        <Hero shows={shows ?? []}/>
        <ShowsContainer user={user} shows={allShowsByCategory}/>
      </div>
    </section>
  )
}
