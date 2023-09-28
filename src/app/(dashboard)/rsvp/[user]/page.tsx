import { kv } from "@vercel/kv";

export default async function Cart({ params }: { params: { user: string } }) {
  const id = `user:${params.user}`
  const current = await kv.get<{ id: string; quantity: number }[]>(id);

  if (!current) {
    console.log("Creating cart for user", params.user)
    await kv.set(id, { id: "1", quantity: 1 });
  }

  if(params.user === 'andru') {
    await kv.set(id, { ...current, name: params.user });
  }

  console.log({ id, current })
  return (
    <div>
      {current?.map((item) => (
        <div key={item.id}>
          {item.id} - {item.quantity}
        </div>
      ))}
    </div>
  );
}