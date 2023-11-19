import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import MyShows from "@/components/my-shows"
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: "My List",
  description: "All TV shows and movies you've added to your list",
}

export default function FaqsPage() {

  return (
    <section className="pb-16 pt-10">
      <div
        className={cn("w-full space-y-5 sm:space-y-10")}
      >
        <div className="container w-full max-w-screen-2xl space-y-1 sm:space-y-2.5">
          <h1 className="text-lg font-semibold text-white/90 transition-colors hover:text-white sm:text-xl">
            FAQs
          </h1>
        </div>
      </div>
    </section>
  )
}
