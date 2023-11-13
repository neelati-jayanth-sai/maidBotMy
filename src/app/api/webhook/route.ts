import { NextResponse } from "next/server";
import axios from "axios";
import { db } from "@/db";
import { messages, req_dumps } from "@/db/schema";
import { handleIncomingMessage } from "@/lib/whatsapp/mainHandler";
import { prisma } from "@/lib/whatsapp/prisma/client";

const token = process.env.WHATSAPP_TOKEN;

interface Maid {
  id: string;
  name: string;
  age: number;
  gender: string;
  availableTime: string;
}

const foundMaids = [
  {
    id: "M1",
    name: "Alice",
    age: 28,
    gender: "Female",
    availableTime: "Monday to Friday, 9 am - 5 pm",
  },
  {
    id: "M2",
    name: "Bob",
    age: 35,
    gender: "Male",
    availableTime: "Monday, Wednesday, Friday, 1 pm - 8 pm",
  },
  {
    id: "M3",
    name: "Charlie",
    age: 22,
    gender: "Male",
    availableTime: "Tuesday, Thursday, Saturday, 10 am - 6 pm",
  },
  {
    id: "M4",
    name: "Diana",
    age: 30,
    gender: "Female",
    availableTime: "Monday to Sunday, 6 am - 10 pm",
  },
];

const replyMessgaes = {
  MainMenu:
    "Hello user we are happy to help you!\n you are at the write place to to find easy and cost effectively\nHere are few options to help you with\n1. Find main near me\n2. Join membership\n3. Restart conversation\n4. Support&help\n5. Main menu\n6.  register as maid\n please give number to select the  command",
  FindMaid: {
    start: "Please share your location.",
    locationReceived: `Thank you for sharing your location. We found ${
      foundMaids.length
    } maids nearby your locality:\n${foundMaids
      .map(
        (maid) =>
          `${maid.id} ${maid.name} age ${maid.age} Gender: ${maid.gender} Available Timing: ${maid.availableTime}`
      )
      .join("\n")}\nTo choose the maid please enter there id`,
  },
};

async function sendWhatsAppMessage(
  phoneNumberId: string,
  to: string,
  text: string
) {
  const url = `https://graph.facebook.com/v17.0/${phoneNumberId}/messages?access_token=${token}`;
  console.log("send", text);

  const data = {
    messaging_product: "whatsapp",
    to: to,
    text: { body: text },
  };

  const headers = { "Content-Type": "application/json" };

  try {
    const response = await axios({
      method: "POST",
      url,
      data,
      headers,
    });

    console.log(response.data);
  } catch (error: any) {
    console.error("Error sending WhatsApp message:", error.response?.data);
  }
}
async function handleMaidId(
  phoneNumberId: string,
  from: string,
  maidId: string
) {
  const isValidMaidId = foundMaids.some((maid) => maid.id === maidId);

  if (isValidMaidId) {
    const paymentLink = "Your payment link "+"https://www.google.com/";
    const thankYouMessage = `Thank you for choosing maid ${maidId}! Click the following link to make a payment: ${paymentLink}`;
    await sendWhatsAppMessage(phoneNumberId, from, thankYouMessage);
  } else {
    await sendWhatsAppMessage(
      phoneNumberId,
      from,
      "Invalid maid ID. Please enter a valid maid ID."
    );
  }
}

function responseMessage(msg_body: string): string {
  // Your switch case logic based on the message body
  switch (msg_body.toLowerCase()) {
    case "hi" || "start":
      return replyMessgaes.MainMenu;
    case "1":
      return replyMessgaes.FindMaid.start;
    case "2":
      return replyMessgaes.FindMaid.start;
    case "3":
      return replyMessgaes.MainMenu;
    case "4":
      return "Goodbye!";
    case "5":
      return replyMessgaes.MainMenu;
    case "6":
      return "register as maid";
    default:
      return "I didn't understand that.";
  }
}


export async function POST(req: Request) {
  // Parse the request body from the POST
  let body = JSON.parse(await req.text()) as any;

  // /let rawBody = await req.json();

  // console.dir(body);
  // console.log(JSON.stringify(body, null, 2));
  // Check the Incoming webhook message
  // await db.insert(req_dumps).values({
  //   body: body,
  //   req_text: JSON.stringify(req.body) as any,
  // });

  // info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  //console.log(body.entry[0].changes[0].value.messages[0].text.body);
  if (body.object) {
    let phone_number_id =
      body.entry[0].changes[0].value.metadata.phone_number_id;
    let from = body.entry[0].changes[0].value.messages[0].from;
    // extract the phone number from the webhook payload
    let msg_body =
      body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.text?.body;

    await handleIncomingMessage(body, {
      onTextMessage: async (IncomingMessage) => {
        console.log("p1", phone_number_id);
        console.log("IncomingMessage", IncomingMessage);

        if (IncomingMessage.text.body[0] === "M") {
          const maidId = IncomingMessage.text.body.toUpperCase();
          await handleMaidId(phone_number_id, from, maidId);
        } else {
          const responseMsg = responseMessage(IncomingMessage.text.body);
          await sendWhatsAppMessage(phone_number_id, from, responseMsg);
        }
      },

      onLocationMessage: async (IncomingMessage) => {
        console.log(IncomingMessage);
        const responseMsg = replyMessgaes.FindMaid.locationReceived;
        await sendWhatsAppMessage(phone_number_id, from, responseMsg);
      },
    });

    // if (
    //   body.entry &&
    //   body.entry[0].changes &&
    //   body.entry[0].changes[0] &&
    //   body.entry[0].changes[0].value.messages &&
    //   body.entry[0].changes[0].value.messages[0]
    // ) {
    //   let phone_number_id =
    //     body.entry[0].changes[0].value.metadata.phone_number_id;
    //   console.log(phone_number_id);
    //   let from = body.entry[0].changes[0].value.messages[0].from;
    //   console.log("s", from); // extract the phone number from the webhook payload
    //   //let msg_body = body.entry[0].changes[0].value.messages[0].text.body;
    //   // extract the message text from the webhook payload
    //   let location = false;
    //   let locationData = null;
    //   //let responseMsg = responseMessage(msg_body);
    //   //console.log({ msg_body });
    // axios({
    //   method: "POST", // Required, HTTP method, a string, e.g. POST, GET
    //   url:
    //     "https://graph.facebook.com/v17.0/" +
    //     phone_number_id +
    //     "/messages?access_token=" +
    //     token,
    //   data: {
    //     messaging_product: "whatsapp",
    //     to: from,
    //     text: { body: responseMsg },
    //   },
    //   headers: { "Content-Type": "application/json" },
    // });

    return NextResponse.json({ received: true }, { status: 200 });
  } else {
    // Return a '404 Not Found' if event is not from a WhatsApp API
    return NextResponse.json("Not Found", { status: 404 });
  }
}

type GetReq = {};
export async function GET(req: Request) {
  /**
   * UPDATE YOUR VERIFY TOKEN
   *This will be the Verify Token value when you set up webhook
   **/
  const verify_token = process.env.VERIFY_TOKEN;
  const { searchParams } = new URL(req.url);
  // await db.insert(req_dumps).values({
  //   body: JSON.stringify(req?.body, null, 2),
  //   req_text: JSON.stringify(req, null, 2) as any,
  // });

  // Parse params from the webhook verification request
  let mode = searchParams.get("hub.mode");
  let token = searchParams.get("hub.verify_token");
  let challenge = searchParams.get("hub.challenge");

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === verify_token) {
      // Respond with 200 OK and challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      return new Response(challenge, {
        status: 200,
      });
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
