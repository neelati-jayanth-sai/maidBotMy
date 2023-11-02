// File: handlers.ts

import {
  TextMessage,
  ReactionMessage,
  MediaMessage,
  UnknownMessage,
  Sender,
  LocationMessage,
  QuickReplyButtonMessage,
  ListMessageReply,
  ReplyButtonMessage,
} from "./types";
import { prisma } from "./prisma/client";

export interface MessageHandlerCallbacks {
  onTextMessage?: (message: TextMessage) => Promise<void>;
  onReactionMessage?: (message: ReactionMessage) => Promise<void>;
  onMediaMessage?: (message: MediaMessage) => Promise<void>;
  onUnknownMessage?: (message: UnknownMessage) => Promise<void>;
  onLocationMessage?: (message: LocationMessage) => Promise<void>;
  onQuickReplyButtonMessage?: (
    message: QuickReplyButtonMessage
  ) => Promise<void>;
  onListMessageReply?: (message: ListMessageReply) => Promise<void>;
  onReplyButtonMessage?: (message: ReplyButtonMessage) => Promise<void>;
}

function parseSender(change: any): Sender {
  const contact = change.value.contacts[0];
  return {
    name: contact.profile.name,
    phoneNumber: contact.wa_id,
  };
}

async function handleTextMessage(
  message: any,
  change: any,
  callbacks: MessageHandlerCallbacks
): Promise<void> {
  const parsedMessage: TextMessage = {
    from: parseSender(change),
    id: message.id,
    timestamp: message.timestamp,
    text: { body: message.text.body },
    type: "text",
  };
  callbacks.onTextMessage && callbacks.onTextMessage(parsedMessage);

  const sender = await prisma.sender.upsert({
    where: { phoneNumber: parsedMessage.from.phoneNumber },
    update: { name: parsedMessage.from.name },
    create: {
      name: parsedMessage.from.name,
      phoneNumber: parsedMessage.from.phoneNumber,
    },
  });

  await prisma.message.create({
    data: {
      whatsappId: parsedMessage.id,
      timestamp: new Date(parsedMessage.timestamp * 1000),
      messageType: parsedMessage.type,
      Sender: { connect: { id: sender.id } },
      TextMessage: {
        create: { body: parsedMessage.text.body },
      },
    },
  });
}
async function handleReactionMessage(
  message: any,
  change: any,
  callbacks: MessageHandlerCallbacks
): Promise<void> {
  const parsedMessage: ReactionMessage = {
    from: parseSender(change),
    id: message.id,
    timestamp: message.timestamp,
    reaction: {
      message_id: message.reaction.message_id,
      emoji: message.reaction.emoji,
    },
    type: "reaction",
  };
  callbacks.onReactionMessage && callbacks.onReactionMessage(parsedMessage);

  const sender = await prisma.sender.upsert({
    where: { phoneNumber: parsedMessage.from.phoneNumber },
    update: { name: parsedMessage.from.name },
    create: {
      name: parsedMessage.from.name,
      phoneNumber: parsedMessage.from.phoneNumber,
    },
  });

  await prisma.message.create({
    data: {
      whatsappId: parsedMessage.id,
      timestamp: new Date((parsedMessage.timestamp as any) * 1000),
      messageType: parsedMessage.type,
      Sender: { connect: { id: sender.id } },
      ReactionMessage: {
        create: {
          reactedMessageId: parsedMessage.reaction.message_id,
          emoji: parsedMessage.reaction.emoji,
        },
      },
    },
  });
}

async function handleMediaMessage(
  message: any,
  change: any,
  callbacks: MessageHandlerCallbacks
): Promise<void> {
  const parsedMessage: MediaMessage = {
    from: parseSender(change),
    id: message.id,
    timestamp: message.timestamp,
    media: {
      media_url: message.media.media_url,
      mime_type: message.media.mime_type,
      file_sha256: message.media.file_sha256,
      file_length: message.media.file_length,
      caption: message.media.caption,
    },
    type: "media",
  };
  callbacks.onMediaMessage && callbacks.onMediaMessage(parsedMessage);

  const sender = await prisma.sender.upsert({
    where: { phoneNumber: parsedMessage.from.phoneNumber },
    update: { name: parsedMessage.from.name },
    create: {
      name: parsedMessage.from.name,
      phoneNumber: parsedMessage.from.phoneNumber,
    },
  });

  await prisma.message.create({
    data: {
      whatsappId: parsedMessage.id,
      timestamp: new Date(parsedMessage.timestamp * 1000),
      messageType: parsedMessage.type,
      Sender: { connect: { id: sender.id } },
      MediaMessage: {
        create: {
          mediaUrl: parsedMessage.media.media_url,
          mimeType: parsedMessage.media.mime_type,
          fileSha256: parsedMessage.media.file_sha256,
          fileLength: parsedMessage.media.file_length,
          caption: parsedMessage.media.caption,
        },
      },
    },
  });
}

async function handleLocationMessage(
  message: any,
  change: any,
  callbacks: MessageHandlerCallbacks
): Promise<void> {
  const parsedMessage: LocationMessage = {
    from: parseSender(change),
    id: message.id,
    timestamp: message.timestamp,
    location: {
      latitude: message.location.latitude,
      longitude: message.location.longitude,
      name: message.location.name,
      address: message.location.address,
    },
    type: "location",
  };
  callbacks.onLocationMessage && callbacks.onLocationMessage(parsedMessage);

  const sender = await prisma.sender.upsert({
    where: { phoneNumber: parsedMessage.from.phoneNumber },
    update: { name: parsedMessage.from.name },
    create: {
      name: parsedMessage.from.name,
      phoneNumber: parsedMessage.from.phoneNumber,
    },
  });

  await prisma.message.create({
    data: {
      whatsappId: parsedMessage.id,
      timestamp: new Date(parsedMessage.timestamp * 1000),
      messageType: parsedMessage.type,
      Sender: { connect: { id: sender.id } },
      LocationMessage: {
        create: {
          latitude: parsedMessage.location.latitude,
          longitude: parsedMessage.location.longitude,
          name: parsedMessage.location.name,
          address: parsedMessage.location.address,
        },
      },
    },
  });
}

async function handleUnknownMessage(
  message: any,
  change: any,
  callbacks: MessageHandlerCallbacks
): Promise<void> {
  const parsedMessage: UnknownMessage = {
    from: parseSender(change),
    id: message.id,
    timestamp: message.timestamp,
    type: "unknown",
  };
  callbacks.onUnknownMessage && callbacks.onUnknownMessage(parsedMessage);

  const sender = await prisma.sender.upsert({
    where: { phoneNumber: parsedMessage.from.phoneNumber },
    update: { name: parsedMessage.from.name },
    create: {
      name: parsedMessage.from.name,
      phoneNumber: parsedMessage.from.phoneNumber,
    },
  });

  await prisma.message.create({
    data: {
      whatsappId: parsedMessage.id,
      timestamp: new Date(parsedMessage.timestamp * 1000),
      messageType: parsedMessage.type,
      Sender: { connect: { id: sender.id } },
      UnknownMessage: {
        create: {},
      },
    },
  });
}

async function handleQuickReplyButtonMessage(
  message: any,
  change: any,
  callbacks: MessageHandlerCallbacks
): Promise<void> {
  const parsedMessage: QuickReplyButtonMessage = {
    from: parseSender(change),
    id: message.id,
    timestamp: message.timestamp,
    type: "button",
    button: message.button,
  };
  callbacks.onQuickReplyButtonMessage &&
    callbacks.onQuickReplyButtonMessage(parsedMessage);
  const sender = await prisma.sender.upsert({
    where: { phoneNumber: parsedMessage.from.phoneNumber },
    update: { name: parsedMessage.from.name },
    create: {
      name: parsedMessage.from.name,
      phoneNumber: parsedMessage.from.phoneNumber,
    },
  });
  await prisma.message.create({
    data: {
      whatsappId: parsedMessage.id,
      timestamp: new Date(parsedMessage.timestamp * 1000),
      messageType: parsedMessage.type,
      Sender: { connect: { id: sender.id } },
      QuickReplyButtonMessage: {
        create: {
          text: parsedMessage.button.text,
          payload: parsedMessage.button.payload,
        },
      },
    },
  });
}

async function handleListMessageReply(
  message: any,
  change: any,
  callbacks: MessageHandlerCallbacks
): Promise<void> {
  const parsedMessage: ListMessageReply = {
    from: parseSender(change),
    id: message.id,
    timestamp: message.timestamp,
    type: "interactive",
    interactive: message.interactive,
  };
  callbacks.onListMessageReply && callbacks.onListMessageReply(parsedMessage);
  // ... upsert sender and create message in DB

  const sender = await prisma.sender.upsert({
    where: { phoneNumber: parsedMessage.from.phoneNumber },
    update: { name: parsedMessage.from.name },
    create: {
      name: parsedMessage.from.name,
      phoneNumber: parsedMessage.from.phoneNumber,
    },
  });

  await prisma.message.create({
    data: {
      whatsappId: parsedMessage.id,
      timestamp: new Date(parsedMessage.timestamp * 1000),
      messageType: parsedMessage.type,
      Sender: { connect: { id: sender.id } },
      ListMessageReply: {
        create: {
          listReplyId: parsedMessage.interactive.list_reply.id,
          title: parsedMessage.interactive.list_reply.title,
          description: parsedMessage.interactive.list_reply.description,
        },
      },
    },
  });
}

async function handleReplyButtonMessage(
  message: any,
  change: any,
  callbacks: MessageHandlerCallbacks
): Promise<void> {
  const parsedMessage: ReplyButtonMessage = {
    from: parseSender(change),
    id: message.id,
    timestamp: message.timestamp,
    type: "interactive",
    interactive: message.interactive,
  };
  callbacks.onReplyButtonMessage &&
    callbacks.onReplyButtonMessage(parsedMessage);
  // ... upsert sender and create message in DB

  const sender = await prisma.sender.upsert({
    where: { phoneNumber: parsedMessage.from.phoneNumber },
    update: { name: parsedMessage.from.name },
    create: {
      name: parsedMessage.from.name,
      phoneNumber: parsedMessage.from.phoneNumber,
    },
  });

  await prisma.message.create({
    data: { 
      whatsappId: parsedMessage.id,
      timestamp: new Date(parsedMessage.timestamp * 1000),
      messageType: parsedMessage.type,
      Sender: { connect: { id: sender.id } },
      ReplyButtonMessage: {
        create: {
          buttonReplyId: parsedMessage.interactive.button_reply.id,
          title: parsedMessage.interactive.button_reply.title,
        },
      },
    },
  });
}

export {
  handleTextMessage,
  handleReactionMessage,
  handleMediaMessage,
  handleUnknownMessage,
  handleLocationMessage,
  handleQuickReplyButtonMessage,
  handleListMessageReply,
  handleReplyButtonMessage,
};
