import { db } from "@/db";
import { wanderleafmessages } from "@/db/schema";
export async function POST(req: Request) {
  const { firstName, lastName, email, message, mobileNumber, subject } =
    await req.json();

  const res = await db
    .insert(wanderleafmessages)
    .values({
      email,
      firstName,
      lastName,
      message,
      mobileNumber,
      subject,
    })
    .returning();
  console.log(res);
  return new Response("ok", {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
