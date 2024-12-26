CREATE TABLE IF NOT EXISTS "parent_student" (
	"parent_id" uuid,
	"student_id" uuid,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "parents" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "parents_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"parent_id" uuid DEFAULT gen_random_uuid(),
	"username" varchar,
	"user_id" uuid,
	"email" varchar NOT NULL,
	"password" varchar,
	CONSTRAINT "parents_parent_id_unique" UNIQUE("parent_id"),
	CONSTRAINT "parents_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reset_password_session" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "reset_password_session_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"otp" text NOT NULL,
	"token" text NOT NULL,
	"expire_at" timestamp NOT NULL,
	"email" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "parent_student" ADD CONSTRAINT "parent_student_parent_id_parents_parent_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."parents"("parent_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "parent_student" ADD CONSTRAINT "parent_student_student_id_students_student_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("student_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
