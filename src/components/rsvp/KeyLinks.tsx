import {cn} from "@/lib/utils";
import {Link} from "@/components/ui/link";
import * as React from "react";

export const KeyLinks = ({ rsvp = true, schedule = true, venue = true, faqs = true, removeContainer = false }: { rsvp?: boolean, schedule?: boolean, venue?: boolean, faqs?: boolean, removeContainer?: boolean }) => {
    const allTrue = removeContainer || rsvp && schedule && venue && faqs
    return (
        <div className={cn("w-full space-y-5 sm:space-y-10 pt-16")}>
            <div className={`${allTrue ? 'container' : ''} w-full max-w-screen-2xl space-y-1 sm:space-y-2.5`}>
                <h2 className="text-lg font-semibold text-white/90 transition-colors hover:text-white sm:text-xl">
                    {'Key Links'}
                </h2>
                <div className="group relative">
                    <div className={'flex space-x-4'}>
                        {rsvp && <Link href="/account" variant={'brand'}>RSVP</Link>}
                        {schedule && <Link href="/schedule">Schedule</Link>}
                        {venue && <Link href="/venue">Venue</Link>}
                        {faqs && <Link href="/faqs">FAQs</Link>}
                    </div>
                </div>
            </div>
        </div>
    )
}