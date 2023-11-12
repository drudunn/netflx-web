import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs';

export async function POST(request: Request) {
  const userId = request.headers.get('userId')

  const formData = await request.formData()
  const attending = formData.get('attending')
  const guests = formData.get('guests')
  const note = formData.get('note')
  const dietary = formData.get('dietary')
  const song = formData.get('song')

  console.log({
    userId,
    attending,
    guests,
    note,
    dietary,
    song
  })

  if (userId) {

    await clerkClient.users.updateUserMetadata(userId , {
      publicMetadata: {
        attending,
        guests,
        note,
        dietary,
        song
      }
    })
    return NextResponse.json({ success: true, dietary });
  }

  return NextResponse.json({ success: false, 'email': 'missing' });
}