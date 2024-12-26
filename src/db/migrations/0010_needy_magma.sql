CREATE TABLE IF NOT EXISTS "reset_password_session" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "reset_password_session_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"otp" text NOT NULL,
	"token" text NOT NULL,
	"expire_at" timestamp NOT NULL,
	"email" text NOT NULL
);
