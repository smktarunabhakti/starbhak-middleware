CREATE TABLE IF NOT EXISTS "parents" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "parents_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"parent_id" uuid DEFAULT gen_random_uuid(),
	"username" varchar,
	"email" varchar NOT NULL,
	"password" varchar,
	CONSTRAINT "parents_parent_id_unique" UNIQUE("parent_id"),
	CONSTRAINT "parents_email_unique" UNIQUE("email")
);
