import React from 'react';
import type { Metadata } from "next"

import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: "FAQs",
  description: "Common questions you may have about the wedding",
}

export default function FaqsLayout({children}: {children: React.ReactNode}) {

  return (
    <section className="pb-16 pt-10">
      <div
        className={cn("w-full space-y-5 sm:space-y-10")}
      >
        <div className="container w-full max-w-screen-2xl space-y-1 sm:space-y-2.5">
            {children}
        </div>
      </div>
    </section>
  )
}
