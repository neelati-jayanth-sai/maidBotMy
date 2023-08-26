CREATE TABLE IF NOT EXISTS "req_dumps" (
	"id" serial PRIMARY KEY NOT NULL,
	"req_text" text,
	"body" text
);
