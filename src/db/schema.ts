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

export type Messages = InferModel<typeof messages, "select">;
