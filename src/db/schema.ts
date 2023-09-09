import { InferModel } from "drizzle-orm";
import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

// users,products,orders,cart,reviews
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  firstName: text("firstName"),
  lastName: text("lastName"),
  email: varchar("email", { length: 256 }),
  message: text("message"),
  mobileNumber: varchar("mobileNumber", { length: 13 }),
  createAt: timestamp("create_at").defaultNow(),
});

export const req_dumps = pgTable('req_dumps', {
  id: serial("id").primaryKey(),
  req_text: text('req_text'),
  body: text('body')
})

export const wanderleafmessages = pgTable("wanderleafmessages", {
  id: serial("id").primaryKey(),
  firstName: text("firstName"),
  lastName: text("lastName"),
  email: varchar("email", { length: 256 }),
  message: text("message"),
  subject: text("subject"),
  mobileNumber: varchar("mobileNumber", { length: 13 }),
  createAt: timestamp("create_at").defaultNow(),
});
export type Messages = InferModel<typeof messages, "select">;
export type ReqDumps = InferModel<typeof req_dumps, "select">;
export type WanderLeafMessages = InferModel<typeof wanderleafmessages, "select">
