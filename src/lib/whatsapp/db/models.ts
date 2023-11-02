// File: models.ts

import { InferModel } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
  numeric,
  pgSchema,
} from "drizzle-orm/pg-core";

// Define the senders table model

export const whatsappSchema = pgSchema("my_schema");

export const senders = whatsappSchema.table("senders", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  phone_number: varchar("phone_number", { length: 20 }).unique(),
});

// Define the messages table model
export const messages = whatsappSchema.table("messages", {
  id: serial("id").primaryKey(),
  whatsapp_id: varchar("whatsapp_id", { length: 255 }).unique(),
  sender_id: integer("sender_id").references(() => senders.id),
  timestamp: timestamp("timestamp"),
  message_type: varchar("message_type", { length: 20 }),
});

// Define the text_messages table model
export const text_messages = whatsappSchema.table("text_messages", {
  message_id: integer("message_id")
    .primaryKey()
    .references(() => messages.id),
  body: text("body"),
});

// Define the reaction_messages table model
export const reaction_messages = whatsappSchema.table("reaction_messages", {
  message_id: integer("message_id")
    .primaryKey()
    .references(() => messages.id),
  reacted_message_id: varchar("reacted_message_id", { length: 255 }),
  emoji: varchar("emoji", { length: 10 }),
});

// Define the media_messages table model
export const media_messages = whatsappSchema.table("media_messages", {
  message_id: integer("message_id")
    .primaryKey()
    .references(() => messages.id),
  media_url: varchar("media_url", { length: 255 }),
  mime_type: varchar("mime_type", { length: 50 }),
  file_sha256: varchar("file_sha256", { length: 64 }),
  file_length: integer("file_length"),
  caption: text("caption"),
});

// Define the location_messages table model
export const location_messages = whatsappSchema.table("location_messages", {
  message_id: integer("message_id")
    .primaryKey()
    .references(() => messages.id),
  latitude: numeric("latitude", { precision: 9, scale: 6 }),
  longitude: numeric("longitude", { precision: 9, scale: 6 }),
  name: varchar("name", { length: 255 }),
  address: varchar("address", { length: 255 }),
});

// Define the unknown_messages table model
export const unknown_messages = whatsappSchema.table("unknown_messages", {
  message_id: integer("message_id")
    .primaryKey()
    .references(() => messages.id),
});

// Define the type aliases using InferModel
export type Senders = InferModel<typeof senders, "select">;
export type Messages = InferModel<typeof messages, "select">;
export type TextMessages = InferModel<typeof text_messages, "select">;
export type ReactionMessages = InferModel<typeof reaction_messages, "select">;
export type MediaMessages = InferModel<typeof media_messages, "select">;
export type LocationMessages = InferModel<typeof location_messages, "select">;
export type UnknownMessages = InferModel<typeof unknown_messages, "select">;
