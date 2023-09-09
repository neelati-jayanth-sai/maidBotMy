CREATE TABLE IF NOT EXISTS "wanderleafmessages" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" text,
	"lastName" text,
	"email" varchar(256),
	"message" text,
	"subject" text,
	"mobileNumber" varchar(13),
	"create_at" timestamp DEFAULT now()
);
