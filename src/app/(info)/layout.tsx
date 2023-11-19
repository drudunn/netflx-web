import React from 'react';
import type { Metadata } from "next"

import { cn } from '@/lib/utils';
import SiteHeader from '@/components/layouts/site-header';
import SiteFooter from '@/components/layouts/site-footer';

export default function FaqsLayout({children}: {children: React.ReactNode}) {

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="pb-16 pt-10">
          <div
            className={cn("w-full space-y-5 sm:space-y-10")}
          >
            <div className="container w-full max-w-screen-lg space-y-1 sm:space-y-2.5">
                {children}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
