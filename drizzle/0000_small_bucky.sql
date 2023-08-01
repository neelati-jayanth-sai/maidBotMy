CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" text,
	"lastName" text,
	"email" varchar(256),
	"messsage" text,
	"create_at" timestamp DEFAULT now()
);
