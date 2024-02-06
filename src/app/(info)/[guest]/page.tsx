import { Link } from '@/components/ui/link';
import {KeyLinks} from "@/components/rsvp/KeyLinks";

interface guestInfo {
  guests: string,
  numRooms?: 'one' | 'two',
  numGuests?: string,
  barn?: 'The Farmhouse' | 'The Barnhouse',
  roomSize?: string
}

type Guest = string

export const guests: Record<Guest, guestInfo> = {
  'sarah': {
    guests: 'Sarah & Sam',
  },
  'bre': {
    guests: 'Rhiannon & Ben'
  },
  'yvonne': {
    guests: 'Nanny Cakes',
    barn: 'The Barnhouse'
  },
  'debbie': {
    guests: 'Debbie & Keith'
  },
  'barbara': {
    guests: 'Barbara & Charles'
  },
  'mykel': {
    guests: 'Mykel & Mads'
  },
  'james': {
    guests: 'James & Nicole'
  },
  'lee': {
    guests: 'Lee, Helen, Harrison & Amelia',
    numRooms: 'two',
    numGuests: 'four',
    barn: 'The Barnhouse',
    roomSize: 'double rooms'
  },
  'fay': {
    guests: 'Fay, Olivia & Ellie',
    numGuests: 'three',
    roomSize: 'triple room'
  },
  'chip': {
    guests: 'Beth & Nick',
    barn: 'The Barnhouse'
  },
  'joe': {
    guests: 'Joe',
    barn: 'The Barnhouse'
  },
  'ryan': {
    guests: 'Ryan & Claire',
    barn: 'The Barnhouse'
  },
  jameson: {
    guests: 'Jameson',
    barn: 'The Barnhouse',
    numGuests: 'one',
  },
  'bee': {
    guests: 'Bee & Marcus',
    barn: 'The Barnhouse'
  }
}

export default function Page ({ params: { guest } }: { params: { guest: string } }) {
  const guestInfo = guests[guest]
  const isGuest = !!guestInfo?.guests

  return (isGuest ? (
      <Accomm {...guestInfo} />
    ) : (
      <div className={'flex flex-col space-y-4 max-w-xl'}>
        <p>{`Sorry, we can't find that page`}</p>
        <div>
          <Link href={'/'} variant={'brand'}>Go home</Link>
        </div>
      </div>
    )
  )
}

const P = ({children}: { children: React.ReactNode}) => (
  <p className={`text-white/70`}>{children}</p>
)
const Large = ({children}: { children: React.ReactNode}) => (
  <p className={`text-white/70 text-lg`}>{children}</p>
)

const Strong = ({children}: { children: React.ReactNode}) => (
  <strong className={`text-white/80`}>{children}</strong>
)

const Accomm = ({ guests, numRooms = 'one', numGuests = 'two', barn = 'The Farmhouse', roomSize = 'double room' }: guestInfo) => {
  return (
    <>
      <h1 className={`text-2xl font-semibold text-white/90 transition-colors hover:text-white`}>Accommodation</h1>
      <hr />
    <div className={'flex max-sm:flex-col max-sm:space-y-12 sm:space-x-12'}>
    <div>

    <div className={'flex flex-col space-y-4 max-w-xl'}>
      <div className={'flex flex-col space-y-4 mt-8'}>
        <Large>Hi <Strong><span className={'capitalize'}>{guests}</span></Strong></Large>
        <Large>We’ve reserved <Strong>{numRooms}</Strong> of the rooms on site for {numGuests === 'one' ? <><Strong>you</Strong></> : <>you <Strong>{numGuests}</Strong></>}.</Large>
        <Large>You will be in the <Strong>{barn}</Strong>, there {numRooms === 'one' ? 'is a' : `are ${numRooms}`} <Strong>{roomSize}</Strong> for you to rest in after all the food and dancing.</Large>
        <Large>Breakfast is included and will be delivered to the barn in the morning.</Large>
        <Large>Check in is 2pm, so to be done at some point after the ceremony. Check out is at 10am.</Large>
      </div>

      <span className={'!my-4'}/>

      <div className={'flex flex-col space-y-4 max-w-xl'}>
        <P>Each room is £250 but we know it’s a lot, so we’d like to split this cost in half with everyone (£125).</P>

        <P>You’re more than welcome to contribute less or more towards your room, but the most important thing to us is that you are on site with the family for the day. 💖</P>

        <P>This is of course up to you, and if you’d prefer to stay somewhere else, please let us know as soon as possible so we can offer the room to another guest.</P>

        <P>If you do wish to stay in <Strong>{barn}</Strong>, please confirm with us <Strong>on WhatsApp</Strong>, and send your room contribution <a className={`text-white/70 underline transition-colors hover:text-white`} href={'https://monzo.me/andrudunn?d=Wedding%20Acommodation'}>via this link</a>.
        </P>
      </div>
    </div>
    </div>

      <div className={'sm:basis-2/5 md:basis-1/2'}>
        <img src={'/images/venue/accomm.png'} alt={'Silchester accommodation'} className={'w-full'} />
      </div>
    </div>
      <img src={'/images/venue/barn.jpg'} alt={'Silchester accommodation'} className={'w-full !mt-8'} />
      <KeyLinks addContainer={false} />
      </>
  )
}