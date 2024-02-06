export interface guestInfo {
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
    barn: 'The Barnhouse',
    numGuests: 'one',
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