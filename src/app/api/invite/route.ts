const code = `mankellow`

export async function POST(request: Request) {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const res = await request.json()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const success = res?.password === code

  return new Response(JSON.stringify({ success }), {
    status: success ? 200 : 401,
  })
}
