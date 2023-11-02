// File: mainHandler.ts

import {
  handleTextMessage,
  handleReactionMessage,
  handleMediaMessage,
  handleUnknownMessage,
  MessageHandlerCallbacks,
  handleLocationMessage,
  handleReplyButtonMessage,
  handleListMessageReply,
} from "./handlers";
import { prisma } from "./prisma/client";
import { WhatsAppMessagePayload } from "./types";

async function handleIncomingMessage(
  payload: WhatsAppMessagePayload,
  callbacks: MessageHandlerCallbacks
): Promise<void> {
  console.log({ payload });
  for (const entry of payload.entry) {
    for (const change of entry.changes) {
      for (const message of change.value.messages) {
        console.log({ message: JSON.stringify(message, null, 2) });
        switch (message.type) {
          case "text":
            handleTextMessage(message, change, callbacks);
            break;
          case "reaction":
            handleReactionMessage(message, change, callbacks);
            break;
          case "media":
            handleMediaMessage(message, change, callbacks);
            break;
          case "location":
            handleLocationMessage(message, change, callbacks);
            break;
          case "button":
            handleReplyButtonMessage(message, change, callbacks);
          case "interactive":
            handleListMessageReply(message, change, callbacks);
            break;
          default:
            handleUnknownMessage(message, change, callbacks);
        }
      }
    }
  }
  await prisma.$disconnect();
}

export { handleIncomingMessage };
