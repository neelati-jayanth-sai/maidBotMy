import { NextResponse } from "next/server";
import axios from "axios";
import { db } from "@/db";
import { req_dumps } from "@/db/schema";

const token = process.env.WHATSAPP_TOKEN;

export async function POST(req: Request) {
  // Parse the request body from the POST
  let { body } = req as any;

  // Check the Incoming webhook message
  console.log(JSON.stringify(req.body, null, 2));
  await db.insert(req_dumps).values({
    body: body,
    req_text: JSON.stringify(req, null, 2) as any,
  });

  // info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  if (body.object) {
    if (
      body.entry &&
      body.entry[0].changes &&
      body.entry[0].changes[0] &&
      body.entry[0].changes[0].value.messages &&
      body.entry[0].changes[0].value.messages[0]
    ) {
      let phone_number_id =
        body.entry[0].changes[0].value.metadata.phone_number_id;
      let from = body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
      let msg_body = body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload
      axios({
        method: "POST", // Required, HTTP method, a string, e.g. POST, GET
        url:
          "https://graph.facebook.com/v12.0/" +
          phone_number_id +
          "/messages?access_token=" +
          token,
        data: {
          messaging_product: "whatsapp",
          to: from,
          text: { body: "Ack: " + msg_body },
        },
        headers: { "Content-Type": "application/json" },
      });
    }
    return NextResponse.json({ received: true }, { status: 200 });
  } else {
    // Return a '404 Not Found' if event is not from a WhatsApp API
    return NextResponse.json("Not Found", { status: 404 });
  }
}

type GetReq = {};
export async function GET(req: any) {
  /**
   * UPDATE YOUR VERIFY TOKEN
   *This will be the Verify Token value when you set up webhook
   **/
  const verify_token = process.env.VERIFY_TOKEN;
  console.log({ req: req, body: req.body });
  await db.insert(req_dumps).values({
    body: req.body,
    req_text: JSON.stringify(req, null, 2) as any,
  });


  // Parse params from the webhook verification request
  let mode = req.body?.["hub.mode"] ?? "";
  let token = req.body?.["hub.verify_token"] ?? "";
  let challenge = req.body?.["hub.challenge"] ?? "";

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === verify_token) {
      // Respond with 200 OK and challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      return NextResponse.json({ challenge });
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      return new Response("403 Forbidden", {
        status: 403,
      });
    }
  }
  return new Response("OK", {
    status: 200,
  });
}
