import { db } from "@/db";
import { messages } from "@/db/schema";
export async function POST(req: Request) {
  const { firstName, lastName, email, message, mobileNumber } =
    await req.json();

  const res = await db
    .insert(messages)
    .values({
      email,
      firstName,
      lastName,
      message,
      mobileNumber,
    })
    .returning();
  console.log(res);
  return new Response("ok");
}
