import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs';

export async function POST(request: Request) {
  const userId = request.headers.get('userId')

  const formData = await request.formData()
  const dietary = formData.get('dietary')
  const email = formData.get('email')

  if (email) {

    await clerkClient.users.updateUserMetadata(userId as string, {
      publicMetadata: {
        dietary
      }
    })
    return NextResponse.json({ success: true, dietary });
  }

  return NextResponse.json({ success: false, 'email': 'missing' });
}